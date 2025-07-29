import { useState } from 'react';
import Select from 'react-select';
import portfolioData from '../data/portfolioData';

function CustomPortfolioInput() {
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(1000); // Default to $1000
  const [error, setError] = useState('');

  const options = portfolioData.map(item => ({
    value: item.token,
    label: `${item.token} (${item.sector})`,
  }));

  const handleChange = selected => {
    setSelectedTokens(selected);
  };

  const handleInvestmentChange = (e) => {
    const value = e.target.value;
    if (value < 25) {
      setError('Investment amount must be at least $25');
      setInvestmentAmount('');
    } else {
      setError('');
      setInvestmentAmount(Number(value));
    }
  };

  return (
    <div className="mx-4 md:mx-8 p-4 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Create Custom Portfolio</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="investmentAmount" className="text-sm font-medium">
            Investment Amount ($):
          </label>
          <input
            id="investmentAmount"
            type="number"
            value={investmentAmount}
            onChange={handleInvestmentChange}
            min="25"
            className="border rounded p-2 w-32 text-sm"
            placeholder="Enter amount"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
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
                <th className="p-2 border">Investment ($)</th>
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
                    <td className="p-2 border">
                      {investmentAmount ? `$${((item.allocation * investmentAmount) / 100).toFixed(2)}` : 'N/A'}
                    </td>
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