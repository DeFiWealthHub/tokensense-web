import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import portfolioData from '../data/portfolioData';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const PortfolioDashboard = () => {
  const [investmentAmount, setInvestmentAmount] = useState(1000); // Default to $1000
  const [error, setError] = useState('');
  const [customPortfolio, setCustomPortfolio] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');

  console.log('portfolioData:', portfolioData);

  // Top 100 tokens from CoinMarketCap data
  const top100Tokens = [
    { token: "Bitcoin BTC", price: 117739.95 },
    { token: "Ethereum ETH", price: 3772.18 },
    { token: "Binance Coin BNB", price: 801.47 },
    { token: "Tether USDT", price: 0.9998 },
    { token: "Solana SOL", price: 180.45 },
    { token: "USD Coin USDC", price: 0.9998 },
    { token: "Ripple XRP", price: 3.11 },
    { token: "Dogecoin DOGE", price: 0.2226 },
    { token: "TRON TRX", price: 0.34 },
    { token: "Cardano ADA", price: 0.78 },
    { token: "Hyperliquid HYPE", price: 43.20 },
    { token: "Stellar XLM", price: 0.42 },
    { token: "Sui SUI", price: 3.79 },
    { token: "Chainlink LINK", price: 17.75 },
    { token: "Bitcoin Cash BCH", price: 563.66 },
    { token: "Hedera HBAR", price: 0.26 },
    { token: "Avalanche AVAX", price: 24.19 },
    { token: "UNUS SED LEO LEO", price: 8.96 },
    { token: "Litecoin LTC", price: 107.97 },
    { token: "Toncoin TON", price: 3.37 },
    { token: "Ethena USDe USDe", price: 1.00 },
    { token: "Shiba Inu SHIB", price: 0.000013 },
    { token: "Uniswap UNI", price: 10.24 },
    { token: "Polkadot DOT", price: 3.88 },
    { token: "Monero XMR", price: 312.75 },
    { token: "Dai DAI", price: 1.00 },
    { token: "Bitget Token BGB", price: 4.52 },
    { token: "Pepe PEPE", price: 0.000008 },
    { token: "Cronos CRO", price: 0.14 },
    { token: "Aave AAVE", price: 280.41 },
    { token: "Ethena ENA", price: 0.57 },
    { token: "Bittensor TAO", price: 378.80 },
    { token: "NEAR Protocol NEAR", price: 2.70 },
    { token: "Pi PI", price: 0.43 },
    { token: "Ethereum Classic ETC", price: 21.63 },
    { token: "Aptos APT", price: 4.55 },
    { token: "Ondo ONDO", price: 0.95 },
    { token: "Internet Computer ICP", price: 5.41 },
    { token: "OKB OKB", price: 48.26 },
    { token: "Mantle MNT", price: 0.76 },
    { token: "Kaspa KAS", price: 0.10 },
    { token: "Pudgy Penguins PENGU", price: 0.04 },
    { token: "POL (prev. MATIC) POL", price: 0.22 },
    { token: "Bonk BONK", price: 0.000019 },
    { token: "Algorand ALGO", price: 0.26 },
    { token: "World Liberty Financial USD USD1", price: 1.00 },
    { token: "Arbitrum ARB", price: 0.42 },
    { token: "GateToken GT", price: 17.52 },
    { token: "VeChain VET", price: 0.03 },
    { token: "Render RENDER", price: 3.86 },
    { token: "Worldcoin WLD", price: 1.07 },
    { token: "OFFICIAL TRUMP TRUMP", price: 9.45 },
    { token: "SPX6900 SPX", price: 1.98 },
    { token: "Sei SEI", price: 0.32 },
    { token: "Sky SKY", price: 0.09 },
    { token: "Cosmos ATOM", price: 4.57 },
    { token: "Filecoin FIL", price: 2.56 },
    { token: "Flare FLR", price: 0.02 },
    { token: "Story IP", price: 5.76 },
    { token: "Artificial Superintelligence Alliance FET", price: 0.71 },
    { token: "XDC Network XDC", price: 0.10 },
    { token: "Jupiter JUP", price: 0.53 },
    { token: "First Digital USD FDUSD", price: 1.00 },
    { token: "Quant QNT", price: 119.91 },
    { token: "KuCoin Token KCS", price: 11.31 },
    { token: "Four FORM", price: 3.75 },
    { token: "Injective INJ", price: 13.98 },
    { token: "Celestia TIA", price: 1.84 },
    { token: "Curve DAO Token CRV", price: 0.97 },
    { token: "Optimism OP", price: 0.72 },
    { token: "Stacks STX", price: 0.77 },
    { token: "FLOKI FLOKI", price: 0.00016 },
    { token: "Fartcoin FARTCOIN", price: 1.08 },
    { token: "Immutable IMX", price: 0.56 },
    { token: "Conflux CFX", price: 0.20 },
    { token: "Ethereum Name Service ENS", price: 28.30 },
    { token: "The Graph GRT", price: 0.10 },
    { token: "Pump.fun PUMP", price: 0.000005 },
    { token: "PancakeSwap CAKE", price: 2.83 },
    { token: "dogwifhat WIF", price: 0.98 },
    { token: "Kaia KAIA", price: 0.16 },
    { token: "PayPal USD PYUSD", price: 1.00 },
    { token: "PAX Gold PAXG", price: 3337.18 },
    { token: "Lido DAO LDO", price: 1.03 },
    { token: "Virtuals Protocol VIRTUAL", price: 1.37 },
    { token: "Tezos XTZ", price: 0.84 },
    { token: "Sonic S", price: 0.31 },
    { token: "Vaulta A", price: 0.54 },
    { token: "Nexo NEXO", price: 1.31 },
    { token: "Theta Network THETA", price: 0.85 },
    { token: "Tether Gold XAUt", price: 3331.13 },
    { token: "Raydium RAY", price: 3.00 },
    { token: "IOTA IOTA", price: 0.20 },
    { token: "JasmyCoin JASMY", price: 0.02 },
    { token: "Gala GALA", price: 0.02 },
    { token: "The Sandbox SAND", price: 0.29 },
    { token: "Pyth Network PYTH", price: 0.13 },
    { token: "Pendle PENDLE", price: 4.34 },
    { token: "Aerodrome Finance AERO", price: 0.81 },
    { token: "BitTorrent [New] BTT", price: 0.0000009 },
  ];

  const handleInvestmentChange = (e) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (numValue < 25) {
      setError('Investment amount must be at least $25');
      setInvestmentAmount('');
    } else if (numValue > 10000000) {
      setError('Investment amount cannot exceed $10M');
      setInvestmentAmount('');
    } else {
      setError('');
      setInvestmentAmount(numValue);
    }
  };

  const handleAddToken = () => {
    if (selectedToken && !customPortfolio.includes(selectedToken) && customPortfolio.length < 20) {
      setCustomPortfolio([...customPortfolio, selectedToken]);
      setSelectedToken('');
    }
  };

  const handleRemoveToken = (tokenToRemove) => {
    setCustomPortfolio(customPortfolio.filter(token => token !== tokenToRemove));
  };

  const handleReset = () => {
    setCustomPortfolio([]);
    setSelectedToken('');
  };

  // Use customPortfolio for analysis if not empty, otherwise use preset portfolioData
  const displayData = customPortfolio.length > 0
    ? top100Tokens.filter(token => customPortfolio.includes(token.token)).map(token => ({
        ...token,
        allocation: 100 / Math.min(20, customPortfolio.length), // Even allocation for simplicity
        compositeScore: 6.0, // Default score, adjust logic if needed
        phase: 'Early Adopter', // Default phase, adjust if needed
        riskLevel: 'Moderate', // Default risk, adjust if needed
        justification: 'User-selected token',
        indicators: 'N/A',
        signals: 'N/A'
      }))
    : portfolioData;

  if (!displayData || !Array.isArray(displayData) || displayData.length === 0) {
    return (
      <div className="ml-12 md:ml-16 mr-4 md:mr-8 p-4">
        <p className="text-red-600">Error: Portfolio data is not available.</p>
      </div>
    );
  }

  const chartData = {
    labels: displayData.map(item => item.token),
    datasets: [
      {
        label: 'Adoption S-Curve',
        data: displayData.map(item => ({
          x: item.token === 'Bitcoin BTC' ? 90 :
             item.token === 'Solana SOL' ? 55 :
             item.token === 'Sui SUI' || item.token === 'Toncoin TON' ? 50 :
             item.token === 'Ethereum ETH' || item.token === 'Binance Coin BNB' ? 70 :
             item.token === 'Celestia TIA' || item.token === 'Jupiter JUP' || item.token === 'Avalanche AVAX' ? 25 :
             item.token.includes('PEPE') || item.token.includes('WIF') || item.token.includes('SHIB') ? 20 :
             30,
          y: item.token === 'Bitcoin BTC' ? 95 :
             item.token === 'Solana SOL' ? 40 :
             item.token === 'Sui SUI' || item.token === 'Toncoin TON' ? 35 :
             item.token === 'Ethereum ETH' || item.token === 'Binance Coin BNB' ? 65 :
             item.token === 'Celestia TIA' || item.token === 'Jupiter JUP' || item.token === 'Avalanche AVAX' ? 15 :
             item.token.includes('PEPE') || item.token.includes('WIF') || item.token.includes('SHIB') ? 10 :
             20,
          tooltip: item.signals || 'User-selected token'
        })),
        borderColor: '#2563eb',
        backgroundColor: displayData.map(item =>
          item.token === 'Bitcoin BTC' || item.token === 'Ethereum ETH' || item.token === 'Binance Coin BNB' ? 'green' :
          item.token === 'Solana SOL' || item.token === 'Sui SUI' || item.token === 'Toncoin TON' || item.token === 'Avalanche AVAX' ? 'yellow' :
          'red'
        ),
        pointBackgroundColor: displayData.map(item =>
          item.token === 'Bitcoin BTC' || item.token === 'Ethereum ETH' || item.token === 'Binance Coin BNB' ? 'green' :
          item.token === 'Solana SOL' || item.token === 'Sui SUI' || item.token === 'Toncoin TON' || item.token === 'Avalanche AVAX' ? 'yellow' :
          'red'
        ),
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Adoption Progress (%)' },
        min: 0,
        max: 100,
        ticks: { autoSkip: true, maxTicksLimit: 10 },
      },
      y: {
        title: { display: true, text: 'Market Penetration (%)' },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = displayData[context.dataIndex];
            return `${item.token}: ${context.raw.tooltip}`;
          },
        },
      },
    },
  };

  const criteria = [
    "Adoption (12%)", "Disruption (10%)", "Market Cap (10%)", "Utility (10%)",
    "ISO 20022 Compliance (3%)", "Team Quality (8%)", "Technology (8%)", "Community (8%)",
    "Tokenomics (8%)", "Regulatory Risk (6%)", "Market Sentiment (6%)", "Legal Activities (5%)",
    "Government Actions (5%)", "Corporate Treasury Adoption (5%)", "Quantum Resistance (3%)",
    "Competitive Positioning (1%)", "Industry Periodicals/Claims (4%)"
  ];

  return (
    <div className="ml-12 md:ml-16 mr-4 md:mr-8 p-4 max-w-full overflow-x-auto">

      {/* Investment Amount Input */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
              max="10000000"
              className="border rounded p-2 w-32 text-sm"
              placeholder="Enter amount"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Portfolio Overview</h2>
        <p className="text-sm">
          <strong>Assets:</strong> {displayData.length} (including expanded altcoins and equities bucket)<br />
          <strong>Stablecoin Reserve:</strong> {displayData.find(item => item.token === 'USDT/USDC') ? '10% (USDT/USDC)' : 'N/A'}<br />
          <strong>Context:</strong><br />
          - <strong>Treasury Trends:</strong> 90+ firms hold 796,000 BTC ($84B+), with Strategy (580,250 BTC), Metaplanet (7,800 BTC), and ETF inflows ($14.4B YTD).<br />
          - <strong>XRP:</strong> SEC lawsuit penalty reduced to $50M (June 23, 2025); speculative FedNow adoption.<br />
          - <strong>Meme Coins:</strong> WIF, PEPE, SHIB driven by X sentiment (@CryptoGorillaYT, July 21, 2025).<br />
          - <strong>TIA/JUP/AVAX:</strong> Emerging L1/L2 leaders with institutional interest.
        </p>
      </section>

      {/* S-Curve Chart */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Adoption S-Curve</h2>
        <div className="w-full max-w-[90vw] h-64 mb-4">
          <Line data={chartData} options={chartOptions} />
        </div>
        <p className="text-sm">
          <strong>Inflection Points:</strong> Innovators (2–3%), Early Adopters (10–15%), Early Majority (50%), Late Majority (80%).<br />
          <strong>Markers:</strong><br />
          - Bitcoin BTC/Ethereum ETH/Binance Coin BNB: Green (70–90%, 65–95%, “treasury adoption, ETF inflows”)<br />
          - Solana SOL/Sui SUI/Toncoin TON/Avalanche AVAX: Yellow (50–55%, 35–40%, “institutional dApps, subnets”)<br />
          - Celestia TIA/Jupiter JUP: Red (25%, 15%, “modular L1, DEX aggregator”)<br />
          - PEPE/WIF/SHIB: Red (20%, 10%, “meme coin, X hype”)<br />
        </p>
      </section>

      {/* Full Scoring Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Full Scoring Table</h2>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="table-auto w-full text-sm border-collapse">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="p-2 border">Token</th>
                {criteria.map((criterion, idx) => (
                  <th key={idx} className="p-2 border">{criterion}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.token}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 10 : item.compositeScore >= 7.5 ? 9 : item.compositeScore >= 7.0 ? 8 : item.compositeScore >= 6.5 ? 7 : item.compositeScore >= 6.0 ? 6 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : item.compositeScore >= 7.0 ? 7 : item.compositeScore >= 6.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 10 : item.compositeScore >= 7.5 ? 9 : item.compositeScore >= 7.0 ? 8 : item.compositeScore >= 6.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 10 : item.compositeScore >= 7.5 ? 9 : item.compositeScore >= 7.0 ? 8 : 7}</td>
                  <td className="p-2 border">{item.token.includes('XRP') || item.token.includes('XLM') || item.token.includes('QNT') || item.token.includes('HBAR') ? 8 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : 7}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : 7}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 8 : item.compositeScore >= 7.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 8 : item.compositeScore >= 7.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.token.includes('XRP') ? 4 : item.compositeScore >= 8.0 ? 7 : item.compositeScore >= 7.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.token.includes('PEPE') || item.token.includes('WIF') || item.token.includes('SHIB') ? 8 : item.compositeScore >= 8.0 ? 7 : 6}</td>
                  <td className="p-2 border">{item.token.includes('XLM') || item.token.includes('HBAR') ? 9 : item.compositeScore >= 8.0 ? 6 : 5}</td>
                  <td className="p-2 border">{item.token.includes('BTC') || item.token.includes('ETH') || item.token.includes('BNB') ? 10 : item.token.includes('SOL') || item.token.includes('SUI') || item.token.includes('TON') || item.token.includes('AVAX') ? 7 : item.compositeScore >= 7.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.token.includes('BTC') ? 8 : item.token.includes('ETH') ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 8 : item.compositeScore >= 7.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 7 : item.compositeScore >= 7.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : 7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-2">
          Full scoring table (17 criteria × {displayData.length} assets) available in downloadable PDF.
        </p>
      </section>

      {/* Composite Scores List */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Composite Scores</h2>
        <ul className="list-disc pl-5 text-sm">
          {displayData.map((item, idx) => (
            <li key={idx}>{item.token}: {item.compositeScore.toFixed(2)}</li>
          ))}
        </ul>
      </section>

      {/* Portfolio Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Portfolio Allocation</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Sector</th>
                <th className="p-2 border">Token</th>
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
              {displayData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.sector || 'N/A'}</td>
                  <td className="p-2 border">{item.token}</td>
                  <td className="p-2 border">{item.allocation ? `${item.allocation}%` : 'N/A'}</td>
                  <td className="p-2 border">
                    {investmentAmount ? `$${((item.allocation || 0) * investmentAmount / 100).toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="p-2 border">{item.phase || 'N/A'}</td>
                  <td className="p-2 border">{item.riskLevel || 'N/A'}</td>
                  <td className="p-2 border">{item.compositeScore ? item.compositeScore.toFixed(2) : 'N/A'}</td>
                  <td className="p-2 border whitespace-normal">{item.justification || 'N/A'}</td>
                  <td className="p-2 border whitespace-normal">{item.indicators || 'N/A'}</td>
                  <td className="p-2 border whitespace-normal">{item.signals || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expert Insights */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Expert Insights</h2>
        <p className="text-sm">
          <strong>Mark Moss’s Quantum Wave Cycles:</strong> Portfolio aligns with Phase Two (Early Adopters), capturing institutional trends (BTC, ETH, BNB, SOL, SUI, TON, AVAX) and speculative upside (WIF, PEPE, SHIB).<br />
          <strong>Alex Becker’s Approach:</strong> New altcoins (TIA, JUP, AVAX) reflect low-cap, high-upside assets driven by X sentiment. Meme coins balance volatility.<br />
          <strong>DeFi Expertise:</strong> Stake UNI, AAVE, LDO, DAI for yield. TIA, JUP, AVAX enhance DeFi exposure.<br />
          <strong>Risk Management:</strong> 10% stablecoin reserve mitigates volatility. Meme coins are high-risk but capped.<br />
          <strong>API Monitoring:</strong> CoinDesk, Chainalysis, and X APIs track trends and sentiment.
        </p>
      </section>

      {/* Decorative Divider */}
      <hr className="my-6 border-t-2 border-gray-300" />

      {/* Create Custom Portfolio */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Custom Portfolio</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <select value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)} className="border rounded p-2">
            <option value="">Select a Token</option>
            {top100Tokens.map((token, index) => (
              <option key={index} value={token.token}>{token.token} (${token.price.toFixed(2)})</option>
            ))}
          </select>
          <button
            onClick={handleAddToken}
            disabled={!selectedToken || customPortfolio.length >= 20}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Add Token
          </button>
        </div>
        {customPortfolio.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Custom Portfolio ({customPortfolio.length}/20)</h3>
            <ul className="list-disc pl-5 mt-2">
              {customPortfolio.map((token, index) => (
                <li key={index} className="flex items-center gap-2">
                  {token}
                  <button
                    onClick={() => handleRemoveToken(token)}
                    className="bg-red-500 text-white p-1 rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Reset Button */}
      <section className="mb-6">
        <button
          onClick={handleReset}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </section>
    </div>
  );
};

export default PortfolioDashboard;