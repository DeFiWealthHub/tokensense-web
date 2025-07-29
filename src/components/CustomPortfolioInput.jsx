import { useState } from 'react';
import Select from 'react-select';
import portfolioData from '../data/portfolioData';

function CustomPortfolioInput() {
  const [selectedTokens, setSelectedTokens] = useState([]);

  const options = portfolioData.map(item => ({
    value: item.token,
    label: `${item.token} (${item.sector})`,
  }));

  const handleChange = selected => {
    setSelectedTokens(selected);
  };

  return (
    <div className="p-4 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Create Custom Portfolio</h1>
      <Select
        isMulti
        options={options}
        value={selectedTokens}
        onChange={handleChange}
        className="my-4 max-w-[90vw]"
      />
      {selectedTokens.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Token</th>
                <th className="p-2 border">Sector</th>
                <th className="p-2 border">Allocation (%)</th>
                <th className="p-2 border">Phase</th>
                <th className="p-2 border">Risk Level</th>
                <th className="p-2 border">Composite Score</th>
                <th className="p-2 border min-w-[300px]">Justification</th>
                <th className="p-2 border min-w-[200px]">Indicators</th>
                <th className="p-2 border min-w-[200px]">Signals</th>
              </tr>
            </thead>
            <tbody>
              {selectedTokens.map(({ value }) => {
                const item = portfolioData.find(data => data.token === value);
                return (
                  <tr key={value} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.token}</td>
                    <td className="p-2 border">{item.sector}</td>
                    <td className="p-2 border">{item.allocation}%</td>
                    <td className="p-2 border">{item.phase}</td>
                    <td className="p-2 border">{item.riskLevel}</td>
                    <td className="p-2 border">{item.compositeScore.toFixed(2)}</td>
                    <td className="p-2 border whitespace-normal">{item.justification}</td>
                    <td className="p-2 border whitespace-normal">{item.indicators}</td>
                    <td className="p-2 border whitespace-normal">{item.signals}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomPortfolioInput;