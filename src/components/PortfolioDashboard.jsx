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
      <div className="ml-8 md:ml-12 mr-4 md:mr-8 p-4">
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
              item.token === 'SUI' ? 50 :
              item.token === 'TON' ? 45 :
              item.token === 'TIA' || item.token === 'JUP' ? 25 :
              item.token === 'WIF' || item.token === 'POPCAT' || item.token === 'MOG' ||
              item.token === 'BRETT' || item.token === 'GIGA' || item.token === 'MUMU' ||
              item.token === 'PEPE' ? 20 :
              item.token === 'Equities' ? 60 : 30,
          y: item.token === 'BTC' ? 95 :
              item.token === 'SOL' ? 40 :
              item.token === 'SUI' ? 30 :
              item.token === 'TON' ? 35 :
              item.token === 'TIA' || item.token === 'JUP' ? 15 :
              item.token === 'WIF' || item.token === 'POPCAT' || item.token === 'MOG' ||
              item.token === 'BRETT' || item.token === 'GIGA' || item.token === 'MUMU' ||
              item.token === 'PEPE' ? 10 :
              item.token === 'Equities' ? 50 : 20,
          tooltip: item.signals
        })),
        borderColor: '#2563eb',
        backgroundColor: portfolioData.map(item =>
          item.token === 'BTC' ? 'green' :
          item.token === 'SOL' || item.token === 'SUI' || item.token === 'TON' || item.token === 'Equities' ? 'yellow' :
          'red'
        ),
        pointBackgroundColor: portfolioData.map(item =>
          item.token === 'BTC' ? 'green' :
          item.token === 'SOL' || item.token === 'SUI' || item.token === 'TON' || item.token === 'Equities' ? 'yellow' :
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

  return (
    <div className="ml-8 md:ml-12 mr-4 md:mr-8 p-4 max-w-full overflow-x-auto">
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
          <strong>Assets:</strong> 34 (24 original crypto + 9 new altcoins + 1 Bitcoin treasury equities bucket)<br />
          <strong>Stablecoin Reserve:</strong> 10% (USDT/USDC)<br />
          <strong>Context:</strong><br />
          - <strong>Treasury Trends:</strong> 90+ firms hold 796,000 BTC ($84B+), with Strategy (580,250 BTC), Metaplanet (7,800 BTC), and ETF inflows ($14.4B YTD).<br />
          - <strong>XRP:</strong> SEC lawsuit penalty reduced to $50M (June 23, 2025); speculative FedNow adoption.<br />
          - <strong>Meme Coins:</strong> WIF, POPCAT, MOG, BRETT, GIGA, MUMU, PEPE driven by X sentiment (@CryptoGorillaYT, July 21, 2025).<br />
          - <strong>TIA/JUP:</strong> Emerging DeFi leaders with institutional interest (Solana ecosystem).
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
          - BTC: Green (90%, 95%, “796,000 BTC held, ETF inflows”)<br />
          - SOL: Yellow (55%, 40%, “stablecoin transfers, institutional”)<br />
          - SUI: Yellow (50%, 30%, “institutional dApps”)<br />
          - TON: Yellow (45%, 35%, “Telegram integration”)<br />
          - TIA/JUP: Red (25%, 15%, “modular L1, DEX aggregator”)<br />
          - WIF/POPCAT/MOG/BRETT/GIGA/MUMU/PEPE: Red (20%, 10%, “meme coin, X hype”)<br />
          - Equities: Yellow (60%, 50%, “TAO Alpha +1,000%, Strategy”)
        </p>
      </section>

      {/* Scoring Table Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Scoring Table Summary</h2>
        <p className="text-sm mb-2">
          Scored on 17 criteria: Adoption (12%), Disruption (10%), Market Cap (10%), Utility (10%), ISO 20022 Compliance (3%), Team Quality (8%), Technology (8%), Community (8%), Tokenomics (8%), Regulatory Risk (6%), Market Sentiment (6%), Legal Activities (5%), Government Actions (5%), Corporate Treasury Adoption (5%), Quantum Resistance (3%), Competitive Positioning (1%), Industry Periodicals/Claims (4%).
        </p>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Criterion</th>
                <th className="p-2 border">BTC</th>
                <th className="p-2 border">ETH</th>
                <th className="p-2 border">SOL</th>
                <th className="p-2 border">TIA</th>
                <th className="p-2 border">JUP</th>
                <th className="p-2 border">WIF</th>
                <th className="p-2 border">Equities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Adoption (12%)</td>
                <td className="p-2 border">10</td>
                <td className="p-2 border">9</td>
                <td className="p-2 border">9</td>
                <td className="p-2 border">6</td>
                <td className="p-2 border">6</td>
                <td className="p-2 border">7</td>
                <td className="p-2 border">8</td>
              </tr>
              <tr>
                <td className="p-2 border">Disruption (10%)</td>
                <td className="p-2 border">9</td>
                <td className="p-2 border">9</td>
                <td className="p-2 border">8</td>
                <td className="p-2 border">8</td>
                <td className="p-2 border">8</td>
                <td className="p-2 border">7</td>
                <td className="p-2 border">9</td>
              </tr>
              <tr>
                <td className="p-2 border">Market Cap (10%)</td>
                <td className="p-2 border">10</td>
                <td className="p-2 border">8</td>
                <td className="p-2 border">7</td>
                <td className="p-2 border">3</td>
                <td className="p-2 border">3</td>
                <td className="p-2 border">3</td>
                <td className="p-2 border">6</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-2">
          Full scoring table available in downloadable PDF (17 criteria × 34 assets). Composite scores: BTC (8.59), ETH (8.10), SOL (8.00), TIA (6.54), JUP (6.61), WIF (6.47), Equities (7.89).
        </p>
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
          <strong>Mark Moss’s Quantum Wave Cycles:</strong> Portfolio aligns with Phase Two (Early Adopters), capturing institutional trends (BTC, SOL, SUI, TON, Equities) and speculative upside (WIF, POPCAT, MOG, BRETT, GIGA, MUMU, PEPE). 7% equities bucket leverages high returns (e.g., TAO Alpha’s +1,000%).<br />
          <strong>Alex Becker’s Approach:</strong> Nine new altcoins (TIA, JUP, WIF, POPCAT, MOG, BRETT, GIGA, MUMU, PEPE) reflect low-cap, high-upside assets driven by X sentiment (@CryptoGorillaYT) and DeFi potential. Meme coins (2.5% each) balance volatility with 50x potential.<br />
          <strong>DeFi Expertise:</strong> Stake UNI, AAVE, LDO, DAI for yield (e.g., AAVE’s $22.6B TVL). TIA and JUP enhance DeFi exposure via Solana’s ecosystem. XRP/XLM/HBAR benefit from ISO 20022 and banking alignment.<br />
          <strong>Risk Management:</strong> 10% stablecoin reserve mitigates volatility. Meme coins (17.5% total) and Innovators (2.38–3.0%) are high-risk but capped.<br />
          <strong>API Monitoring:</strong> CoinDesk, Chainalysis, and X APIs track treasury adoptions, regulatory shifts, and sentiment (e.g., @saylor, @NateGeraci). Biweekly rebalancing captures rapid shifts.
        </p>
      </section>

      {/* Recommendations */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
        <p className="text-sm">
          - Verify Quantum Wave Fund’s legitimacy before increasing equity exposure.<br />
          - Monitor TIA/JUP for DeFi partnerships, WIF/POPCAT/MOG/BRETT/GIGA/MUMU/PEPE for X sentiment (@CryptoGorillaYT), and XRP’s lawsuit (August 15, 2025).<br />
          - Track NIST for post-quantum cryptography updates.<br />
          - Consider trimming meme coins if volatility spikes (e.g., BTC drops below $90,000).<br />
          - Enhance app with interactive S-curve markers and automated API-driven rebalancing.
        </p>
      </section>

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