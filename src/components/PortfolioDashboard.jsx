import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import portfolioData from '../data/portfolioData';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const PortfolioDashboard = () => {
  const [portfolio, setPortfolio] = useState(portfolioData);
  const savedPortfolio = JSON.parse(localStorage.getItem('customPortfolio'));
  const displayPortfolio = savedPortfolio || portfolio;

  const chartData = {
    labels: displayPortfolio.map(asset => asset.token),
    datasets: [{
      label: 'Adoption Progress (%)',
      data: displayPortfolio.map(asset => asset.adoptionProgress),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
    }],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, max: 100, title: { display: true, text: 'Adoption Progress (%)' } },
      x: { title: { display: true, text: 'Assets' } },
    },
    plugins: { legend: { display: true }, title: { display: true, text: 'S-Curve: Portfolio Adoption' } },
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Portfolio Overview</h2>
        <Link to="/custom" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Custom Portfolio
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Sector</th>
              <th className="p-2 text-left">Token</th>
              <th className="p-2 text-left">Allocation (%)</th>
              <th className="p-2 text-left">Phase</th>
              <th className="p-2 text-left">Risk Level</th>
              <th className="p-2 text-left">Composite Score</th>
            </tr>
          </thead>
          <tbody>
            {displayPortfolio.map(asset => (
              <tr key={asset.token} className="border-t">
                <td className="p-2">{asset.sector}</td>
                <td className="p-2">{asset.token}</td>
                <td className="p-2">{asset.allocation.toFixed(2)}</td>
                <td className="p-2">{asset.phase}</td>
                <td className="p-2">{asset.riskLevel}</td>
                <td className="p-2">{asset.compositeScore.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">S-Curve Chart</h2>
        <div className="bg-white p-4 shadow rounded">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Investment Justifications</h2>
        <ul className="list-disc pl-5">
          {displayPortfolio.map(asset => (
            <li key={asset.token} className="mb-2">
              <strong>{asset.token}</strong>: {asset.justification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioDashboard;