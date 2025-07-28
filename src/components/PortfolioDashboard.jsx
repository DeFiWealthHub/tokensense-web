import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import portfolioData from '../data/portfolioData';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function PortfolioDashboard() {
  const data = {
    labels: portfolioData.map(item => item.token),
    datasets: [
      {
        label: 'Adoption S-Curve',
        data: portfolioData.map(item => item.compositeScore),
        borderColor: '#2563eb',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
      <Line data={data} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Sector</th>
            <th>Token</th>
            <th>Allocation</th>
            <th>Phase</th>
            <th>Risk Level</th>
            <th>Composite Score</th>
            <th>Justification</th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.map(item => (
            <tr key={item.token}>
              <td>{item.sector}</td>
              <td>{item.token}</td>
              <td>{item.allocation}%</td>
              <td>{item.phase}</td>
              <td>{item.riskLevel}</td>
              <td>{item.compositeScore}</td>
              <td>{item.justification}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/custom" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Create Custom Portfolio
      </a>
    </div>
  );
}

export default PortfolioDashboard;