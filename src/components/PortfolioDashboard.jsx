import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import portfolioData from '../data/portfolioData';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function PortfolioDashboard() {
  const [investmentAmount, setInvestmentAmount] = useState(1000); // Default to $1000
  const [error, setError] = useState('');

  console.log('portfolioData:', portfolioData);

  if (!portfolioData || !Array.isArray(portfolioData) || portfolioData.length === 0) {
    return (
      <div className="ml-12 md:ml-16 mr-4 md:mr-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
        <p className="text-red-600">Error: Portfolio data is not available.</p>
      </div>
    );
  }

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

  const chartData = {
    labels: portfolioData.map(item => item.token),
    datasets: [
      {
        label: 'Adoption S-Curve',
        data: portfolioData.map(item => ({
          x: item.token === 'BTC' ? 90 :
              item.token === 'SOL' ? 55 :
              item.token === 'SUI' || item.token === 'TON' ? 50 :
              item.token === 'ETH' || item.token === 'BNB' ? 70 :
              item.token === 'TIA' || item.token === 'JUP' || item.token === 'AVAX' ? 25 :
              item.token === 'WIF' || item.token === 'POPCAT' || item.token === 'MOG' ||
              item.token === 'BRETT' || item.token === 'GIGA' || item.token === 'MUMU' ||
              item.token === 'PEPE' || item.token === 'DEGEN' ? 20 :
              item.token === 'Equities' ? 60 : 30,
          y: item.token === 'BTC' ? 95 :
              item.token === 'SOL' ? 40 :
              item.token === 'SUI' || item.token === 'TON' ? 35 :
              item.token === 'ETH' || item.token === 'BNB' ? 65 :
              item.token === 'TIA' || item.token === 'JUP' || item.token === 'AVAX' ? 15 :
              item.token === 'WIF' || item.token === 'POPCAT' || item.token === 'MOG' ||
              item.token === 'BRETT' || item.token === 'GIGA' || item.token === 'MUMU' ||
              item.token === 'PEPE' || item.token === 'DEGEN' ? 10 :
              item.token === 'Equities' ? 50 : 20,
          tooltip: item.signals
        })),
        borderColor: '#2563eb',
        backgroundColor: portfolioData.map(item =>
          item.token === 'BTC' || item.token === 'ETH' || item.token === 'BNB' ? 'green' :
          item.token === 'SOL' || item.token === 'SUI' || item.token === 'TON' || item.token === 'AVAX' || item.token === 'Equities' ? 'yellow' :
          'red'
        ),
        pointBackgroundColor: portfolioData.map(item =>
          item.token === 'BTC' || item.token === 'ETH' || item.token === 'BNB' ? 'green' :
          item.token === 'SOL' || item.token === 'SUI' || item.token === 'TON' || item.token === 'AVAX' || item.token === 'Equities' ? 'yellow' :
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
            const item = portfolioData[context.dataIndex];
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
      <h1 className="text-2xl font-bold mb-4">DeFi TokenSense Portfolio Dashboard</h1>

      {/* Investment Amount Input */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Investment Amount</h2>
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
          <strong>Assets:</strong> 58 (including expanded altcoins and equities bucket)<br />
          <strong>Stablecoin Reserve:</strong> 10% (USDT/USDC)<br />
          <strong>Context:</strong><br />
          - <strong>Treasury Trends:</strong> 90+ firms hold 796,000 BTC ($84B+), with Strategy (580,250 BTC), Metaplanet (7,800 BTC), and ETF inflows ($14.4B YTD).<br />
          - <strong>XRP:</strong> SEC lawsuit penalty reduced to $50M (June 23, 2025); speculative FedNow adoption.<br />
          - <strong>Meme Coins:</strong> WIF, POPCAT, MOG, BRETT, GIGA, MUMU, PEPE, DEGEN driven by X sentiment (@CryptoGorillaYT, July 21, 2025).<br />
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
          - BTC/ETH/BNB: Green (70–90%, 65–95%, “treasury adoption, ETF inflows”)<br />
          - SOL/SUI/TON/AVAX: Yellow (50–55%, 35–40%, “institutional dApps, subnets”)<br />
          - TIA/JUP: Red (25%, 15%, “modular L1, DEX aggregator”)<br />
          - WIF/POPCAT/MOG/BRETT/GIGA/MUMU/PEPE/DEGEN: Red (20%, 10%, “meme coin, X hype”)<br />
          - Equities: Yellow (60%, 50%, “TAO Alpha +1,000%, Strategy”)
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
              {portfolioData.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.token}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 10 : item.compositeScore >= 7.5 ? 9 : item.compositeScore >= 7.0 ? 8 : item.compositeScore >= 6.5 ? 7 : item.compositeScore >= 6.0 ? 6 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : item.compositeScore >= 7.0 ? 7 : item.compositeScore >= 6.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 10 : item.compositeScore >= 7.5 ? 9 : item.compositeScore >= 7.0 ? 8 : item.compositeScore >= 6.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 10 : item.compositeScore >= 7.5 ? 9 : item.compositeScore >= 7.0 ? 8 : 7}</td>
                  <td className="p-2 border">{item.token === 'XRP' || item.token === 'XLM' || item.token === 'QNT' || item.token === 'HBAR' ? 8 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : 7}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : 7}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 8 : item.compositeScore >= 7.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 8 : item.compositeScore >= 7.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.token === 'XRP' ? 4 : item.compositeScore >= 8.0 ? 7 : item.compositeScore >= 7.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.token === 'DEGEN' || item.token === 'WIF' || item.token === 'POPCAT' || item.token === 'MOG' || item.token === 'BRETT' || item.token === 'GIGA' || item.token === 'MUMU' || item.token === 'PEPE' ? 8 : item.compositeScore >= 8.0 ? 7 : 6}</td>
                  <td className="p-2 border">{item.token === 'XLM' || item.token === 'HBAR' ? 9 : item.compositeScore >= 8.0 ? 6 : 5}</td>
                  <td className="p-2 border">{item.token === 'BTC' || item.token === 'ETH' || item.token === 'BNB' ? 10 : item.token === 'SOL' || item.token === 'SUI' || item.token === 'TON' || item.token === 'AVAX' ? 7 : item.compositeScore >= 7.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.token === 'BTC' ? 8 : item.token === 'ETH' ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 8 : item.compositeScore >= 7.5 ? 7 : 6}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 7 : item.compositeScore >= 7.5 ? 6 : 5}</td>
                  <td className="p-2 border">{item.compositeScore >= 8.0 ? 9 : item.compositeScore >= 7.5 ? 8 : 7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-2">
          Full scoring table (17 criteria × 58 assets) available in downloadable PDF.
        </p>
      </section>

      {/* Composite Scores List */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Composite Scores</h2>
        <ul className="list-disc pl-5 text-sm">
          {portfolioData.map((item, idx) => (
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
              {portfolioData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.sector}</td>
                  <td className="p-2 border">{item.token}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expert Insights */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Expert Insights</h2>
        <p className="text-sm">
          <strong>Mark Moss’s Quantum Wave Cycles:</strong> Portfolio aligns with Phase Two (Early Adopters), capturing institutional trends (BTC, ETH, BNB, SOL, SUI, TON, AVAX, Equities) and speculative upside (WIF, POPCAT, MOG, BRETT, GIGA, MUMU, PEPE, DEGEN). 7% equities bucket leverages high returns (e.g., TAO Alpha’s +1,000%).<br />
          <strong>Alex Becker’s Approach:</strong> Nine new altcoins (TIA, JUP, AVAX, WIF, POPCAT, MOG, BRETT, GIGA, MUMU, PEPE) reflect low-cap, high-upside assets driven by X sentiment (@CryptoGorillaYT) and DeFi potential. Meme coins (2.5% each) balance volatility with 50x potential.<br />
          <strong>DeFi Expertise:</strong> Stake UNI, AAVE, LDO, DAI, SUSHI, COMP for yield (e.g., AAVE’s $22.6B TVL). TIA, JUP, AVAX enhance DeFi exposure via L1/L2 ecosystems. XRP/XLM/HBAR benefit from ISO 20022.<br />
          <strong>Risk Management:</strong> 10% stablecoin reserve (USDT/USDC) mitigates volatility. Meme coins (20% total) and Innovators (2.38–3.0%) are high-risk but capped.<br />
          <strong>API Monitoring:</strong> CoinDesk, Chainalysis, and X APIs track treasury adoptions, regulatory shifts, and sentiment (e.g., @saylor, @NateGeraci). Biweekly rebalancing captures rapid shifts.
        </p>
      </section>
    </div>
  );
}

export default PortfolioDashboard;