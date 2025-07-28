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
    <div className="p-4 max-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
      <div className="w-full max-w-[90vw] h-64 mb-6">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
              x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
            },
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Sector</th>
              <th className="p-2 border">Token</th>
              <th className="p-2 border">Allocation</th>
              <th className="p-2 border">Phase</th>
              <th className="p-2 border">Risk Level</th>
              <th className="p-2 border">Composite Score</th>
              <th className="p-2 border min-w-[300px]">Justification</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.map(item => (
              <tr key={item.token} className="hover:bg-gray-50">
                <td className="p-2 border">{item.sector}</td>
                <td className="p-2 border">{item.token}</td>
                <td className="p-2 border">{item.allocation}%</td>
                <td className="p-2 border">{item.phase}</td>
                <td className="p-2 border">{item.riskLevel}</td>
                <td className="p-2 border">{item.compositeScore}</td>
                <td className="p-2 border whitespace-normal">{item.justification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a
        href="/custom"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Custom Portfolio
      </a>
    </div>
  );
}

export default PortfolioDashboard;