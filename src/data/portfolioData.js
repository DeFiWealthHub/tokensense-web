const portfolioData = [
  {
    sector: "Blue-Chip/Core",
    token: "BTC",
    allocation: 6.0,
    phase: "Early Majority",
    riskLevel: "Moderate",
    compositeScore: 8.59,
    justification: "6% for treasury leadership, stability",
    indicators: "Adoption (10, $66.6B volume), Treasury Adoption (10, 796,000 BTC), Quantum Resistance (8)",
    signals: "ETF inflows ($14.4B), new treasuries"
  },
  // ... (rest of the 58 tokens, copy from the full artifact if needed)
  {
    sector: "Stablecoin Reserve",
    token: "USDT/USDC",
    allocation: 10.0,
    phase: "N/A",
    riskLevel: "Low",
    compositeScore: 0,
    justification: "10% for volatility mitigation",
    indicators: "Stability (10), Liquidity (10)",
    signals: "DeFi integration, regulatory compliance"
  }
];

export default portfolioData;