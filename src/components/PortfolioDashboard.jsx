import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { tokenData } from '../data/tokens';

const PortfolioDashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [sortConfig, setSortConfig] = useState({ niche: 'all', key: 'roi', direction: 'desc' });
  const [alerts, setAlerts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [tokenPrices, setTokenPrices] = useState({});

  // Initialize Web3 and fetch token data
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Initialize Web3 with Infura
        const web3Instance = new Web3(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);
        setWeb3(web3Instance);

        // Fetch prices from CoinGecko
        const ids = tokenData.map((token) => token.coingeckoId).filter(id => id).join(',');
        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&x-cg-demo-api-key=${import.meta.env.VITE_COINGECKO_API_KEY}`,
          { timeout: 5000 }
        ).catch(async (error) => {
          console.error('CoinGecko API failed:', error);
          // Fallback to CoinMarketCap (optional)
          /*
          const cmcResponse = await axios.get(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
            {
              headers: { 'X-CMC_PRO_API_KEY': import.meta.env.VITE_COINMARKETCAP_API_KEY },
              params: { symbol: tokenData.map((t) => t.name).join(',') },
              timeout: 5000,
            }
          );
          return { data: Object.fromEntries(
            Object.entries(cmcResponse.data.data).map(([symbol, data]) => [symbol.toLowerCase(), { usd: data.quote.USD.price }])
          ) };
          */
          return { data: {} };
        });
        setTokenPrices(priceResponse.data);

        // Fetch TVL, audit status, and scam scores
        const enrichedTokens = await Promise.all(
          tokenData.map(async (token) => {
            try {
              const tvlResponse = await axios.get(`https://api.llama.fi/tvl/${token.coingeckoId}`, { timeout: 5000 }).catch(() => ({ data: { tvl: token.tvl } }));
              const auditResponse = await axios.get(`https://api.certik.com/audit/${token.address}`, { timeout: 5000 }).catch(() => ({ data: { status: token.auditStatus } }));
              const scamResponse = await axios.get(`https://api.tokensniffer.com/score/${token.address}`, { timeout: 5000 }).catch(() => ({ data: { score: token.scamScore } }));
              return {
                ...token,
                tvl: tvlResponse.data.tvl || token.tvl,
                auditStatus: auditResponse.data.status || token.auditStatus,
                scamScore: scamResponse.data.score || token.scamScore,
                lastCode: '',
              };
            } catch (error) {
              console.error(`Error fetching data for ${token.name}:`, error);
              return { ...token, lastCode: '' };
            }
          })
        );
        setTokens(enrichedTokens);
        enrichedTokens.forEach((token) => monitorToken(token));
      } catch (error) {
        console.error('Error initializing Web3 or fetching prices:', error);
        setAlerts((prev) => [...prev, { token: 'System', type: 'Error', message: 'Failed to initialize data' }]);
      }
    };
    initWeb3();
  }, []);

  // Monitor token for TVL outflows and code changes
  const monitorToken = (token) => {
    let previousTVL = token.tvl || 0;
    setInterval(async () => {
      try {
        const tvlResponse = await axios.get(`https://api.llama.fi/tvl/${token.coingeckoId}`, { timeout: 5000 }).catch(() => ({ data: { tvl: token.tvl } }));
        const currentTVL = tvlResponse.data.tvl || token.tvl;
        if (previousTVL > 0 && currentTVL < previousTVL * 0.8) {
          setAlerts((prev) => [
            ...prev,
            {
              token: token.name,
              type: 'TVL Outflow',
              message: `Sudden TVL drop detected for ${token.name}: ${((previousTVL - currentTVL) / previousTVL * 100).toFixed(2)}%`,
            },
          ]);
        }
        previousTVL = currentTVL;

        const codeResponse = await axios.get(
          `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${token.address}&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`
        ).catch(() => ({ data: { status: '0' } }));
        if (codeResponse.data.status === '1' && codeResponse.data.result[0].SourceCode !== token.lastCode) {
          setAlerts((prev) => [
            ...prev,
            {
              token: token.name,
              type: 'Code Change',
              message: `Smart contract code updated for ${token.name}`,
            },
          ]);
          setTokens((prev) =>
            prev.map((t) => (t.address === token.address ? { ...t, lastCode: codeResponse.data.result[0].SourceCode } : t))
          );
        }
      } catch (error) {
        console.error(`Error monitoring ${token.name}:`, error);
      }
    }, 60000);
  };

  // Sort tokens
  const sortTokens = (tokens, key, direction) => {
    return [...tokens].sort((a, b) => {
      if (key === 'roi') return direction === 'desc' ? b.roi - a.roi : a.roi - b.roi;
      if (key === 'name') return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      return 0;
    });
  };

  const handleSort = (niche, key) => {
    setSortConfig({
      niche,
      key,
      direction: sortConfig.niche === niche && sortConfig.key === key ? (sortConfig.direction === 'desc' ? 'asc' : 'desc') : 'desc',
    });
  };

  const niches = ['Blue-Chip/Core', 'DeFi & Staking', 'ISO 20022/Banking', 'AI & Infrastructure', 'Gaming/Metaverse', 'Layer 1/2 Scaling', 'Stablecoins/Liquidity', 'Meme/Social-Fi', 'RWA Tokenization', 'DePIN', 'Bitcoin Treasury Equities'];
  const filteredTokens = sortConfig.niche === 'all'
    ? sortTokens(tokens, sortConfig.key, sortConfig.direction)
    : sortTokens(tokens.filter((token) => token.niche === sortConfig.niche), sortConfig.key, sortConfig.direction);

  return (
    <div className="container mx-auto p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">TokenSense© Portfolio Dashboard</h1>
      <div className="mb-6 p-4 bg-red-900 rounded-lg">
        <h2 className="text-xl font-semibold">Alerts</h2>
        {alerts.length > 0 ? (
          <ul className="list-disc pl-5">
            {alerts.map((alert, index) => (
              <li key={index} className="text-red-200">
                <strong>{alert.type}</strong>: {alert.message} (Token: {alert.token})
              </li>
            ))}
          </ul>
        ) : (
          <p>No alerts at this time.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="mr-2">Filter by Niche:</label>
        <select
          className="p-2 bg-gray-800 text-white rounded"
          value={sortConfig.niche}
          onChange={(e) => setSortConfig({ ...sortConfig, niche: e.target.value })}
        >
          <option value="all">All</option>
          {niches.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </div>
      {niches.map((niche) => {
        const nicheTokens = sortConfig.niche === 'all' ? filteredTokens : filteredTokens.filter((token) => token.niche === niche);
        if (nicheTokens.length === 0) return null;
        return (
          <div key={niche} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{niche}</h2>
            <table className="w-full border-collapse bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-2 cursor-pointer" onClick={() => handleSort(niche, 'name')}>
                    Token Name {sortConfig.key === 'name' && sortConfig.niche === niche ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-2">Niche</th>
                  <th className="p-2 cursor-pointer" onClick={() => handleSort(niche, 'roi')}>
                    ROI (%) {sortConfig.key === 'roi' && sortConfig.niche === niche ? (sortConfig.direction === 'desc' ? '↓' : '↑') : ''}
                  </th>
                  <th className="p-2">Price (USD)</th>
                  <th className="p-2">TVL (USD)</th>
                  <th className="p-2">Audit Status</th>
                  <th className="p-2">Scam Score (0-100)</th>
                  <th className="p-2">Red Flags</th>
                </tr>
              </thead>
              <tbody>
                {nicheTokens.map((token) => (
                  <tr key={token.address} className="border-b border-gray-600">
                    <td className="p-2">{token.name}</td>
                    <td className="p-2">{token.niche}</td>
                    <td className="p-2">{token.roi.toFixed(2)}</td>
                    <td className="p-2">${tokenPrices[token.coingeckoId]?.usd?.toLocaleString() || 'Loading...'}</td>
                    <td className="p-2">${token.tvl.toLocaleString()}</td>
                    <td className="p-2">{token.auditStatus}</td>
                    <td className="p-2">{token.scamScore}</td>
                    <td className="p-2">
                      <ul className="list-disc pl-5">
                        {token.scamScore < 30 && <li>Low score: Potential scam risk</li>}
                        {token.auditStatus === 'Not Audited' && <li>No audit: High risk</li>}
                        {token.tvl < 100000 && <li>Low TVL: Possible illiquidity</li>}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioDashboard;