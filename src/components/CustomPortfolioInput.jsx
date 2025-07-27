import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const mockTokens = [
  { value: 'BTC', label: 'BTC', sector: 'Blue-Chip/Core' },
  { value: 'ZIG', label: 'ZIG', sector: 'Real-World Asset Tokenization' },
  { value: 'ONDO', label: 'ONDO', sector: 'Real-World Asset Tokenization' },
  { value: 'HYPE', label: 'HYPE', sector: 'Meme Coins' },
  { value: 'GRAY', label: 'GRAY', sector: 'Meme Coins' },
];

const CustomPortfolioInput = () => {
  const [assets, setAssets] = useState([]);
  const [totalAllocation, setTotalAllocation] = useState(0);
  const navigate = useNavigate();

  const handleAddAsset = (selected, allocation = 1.5) => {
    if (assets.length < 60 && totalAllocation + allocation <= 90) {
      const newAsset = {
        token: selected.value,
        sector: selected.sector,
        allocation: allocation,
        phase: 'Innovators',
        riskLevel: 'High',
        compositeScore: 6.0,
        adoptionProgress: 20,
        justification: `Added ${selected.label} for diversification.`,
      };
      const updatedAssets = [...assets, newAsset];
      setAssets(updatedAssets);
      setTotalAllocation(totalAllocation + allocation);
      localStorage.setItem('customPortfolio', JSON.stringify(updatedAssets));
    } else {
      alert('Max 60 assets or 90% allocation reached!');
    }
  };

  const handleAllocationChange = (index, value) => {
    const newAllocation = parseFloat(value);
    if (isNaN(newAllocation) || newAllocation < 0) return;
    const oldAllocation = assets[index].allocation;
    const newTotal = totalAllocation - oldAllocation + newAllocation;
    if (newTotal <= 90) {
      const updatedAssets = [...assets];
      updatedAssets[index].allocation = newAllocation;
      setAssets(updatedAssets);
      setTotalAllocation(newTotal);
      localStorage.setItem('customPortfolio', JSON.stringify(updatedAssets));
    } else {
      alert('Total allocation cannot exceed 90%!');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Your Portfolio</h2>
      <Select
        options={mockTokens}
        onChange={(selected) => handleAddAsset(selected)}
        className="mb-4"
        placeholder="Select a token..."
      />
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-xl font-semibold mb-2">Selected Assets</h3>
        {assets.length === 0 ? (
          <p>No assets added yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Token</th>
                <th className="p-2 text-left">Sector</th>
                <th className="p-2 text-left">Allocation (%)</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset.token} className="border-t">
                  <td className="p-2">{asset.token}</td>
                  <td className="p-2">{asset.sector}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={asset.allocation}
                      onChange={(e) => handleAllocationChange(index, e.target.value)}
                      className="w-20 p-1 border rounded"
                      min="0"
                      step="0.1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="mt-4">Total Allocation: {totalAllocation.toFixed(2)}%</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Portfolio
        </button>
      </div>
    </div>
  );
};

export default CustomPortfolioInput;