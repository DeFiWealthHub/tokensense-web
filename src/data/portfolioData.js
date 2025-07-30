const portfolioData = [
  // Blue-Chip/Core
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
  {
    sector: "Blue-Chip/Core",
    token: "ETH",
    allocation: 5.5,
    phase: "Early Majority",
    riskLevel: "Moderate",
    compositeScore: 8.2,
    justification: "5.5% for smart contract leadership",
    indicators: "Adoption (9, $45B volume), Dev Activity (10)",
    signals: "Layer 2 growth, staking"
  },
  {
    sector: "Blue-Chip/Core",
    token: "BNB",
    allocation: 4.0,
    phase: "Early Majority",
    riskLevel: "Moderate",
    compositeScore: 7.8,
    justification: "4% for ecosystem utility",
    indicators: "Adoption (8, $30B volume), Ecosystem (9)",
    signals: "DEX growth, staking rewards"
  },

  // DeFi
  {
    sector: "DeFi",
    token: "UNI",
    allocation: 3.0,
    phase: "Late Early",
    riskLevel: "High",
    compositeScore: 6.5,
    justification: "3% for decentralized exchange leadership",
    indicators: "TVL (7, $4B), Adoption (6)",
    signals: "New pools, governance updates"
  },
  {
    sector: "DeFi",
    token: "AAVE",
    allocation: 2.5,
    phase: "Late Early",
    riskLevel: "High",
    compositeScore: 6.8,
    justification: "2.5% for lending protocol",
    indicators: "TVL (8, $5B), Security (7)",
    signals: "New features, audits"
  },
  {
    sector: "DeFi",
    token: "SUSHI",
    allocation: 1.5,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 5.9,
    justification: "1.5% for DEX innovation",
    indicators: "TVL (6, $2B), Adoption (5)",
    signals: "Partnerships, upgrades"
  },

  // Layer 1
  {
    sector: "Layer 1",
    token: "SOL",
    allocation: 4.5,
    phase: "Early Majority",
    riskLevel: "Moderate",
    compositeScore: 7.6,
    justification: "4.5% for high-throughput blockchain",
    indicators: "TPS (9), Adoption (7)",
    signals: "Ecosystem growth, NFT boom"
  },
  {
    sector: "Layer 1",
    token: "ADA",
    allocation: 3.5,
    phase: "Early Majority",
    riskLevel: "Moderate",
    compositeScore: 7.2,
    justification: "3.5% for smart contract scalability",
    indicators: "Dev Activity (8), Adoption (6)",
    signals: "Staking, upgrades"
  },
  {
    sector: "Layer 1",
    token: "DOT",
    allocation: 3.0,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.9,
    justification: "3% for interoperability",
    indicators: "Parachains (7), Adoption (6)",
    signals: "New chains, governance"
  },

  // Layer 2
  {
    sector: "Layer 2",
    token: "MATIC",
    allocation: 3.0,
    phase: "Late Early",
    riskLevel: "Moderate",
    compositeScore: 6.7,
    justification: "3% for scaling Ethereum",
    indicators: "Adoption (7, $15B volume), TPS (8)",
    signals: "EVM compatibility, growth"
  },
  {
    sector: "Layer 2",
    token: "ARB",
    allocation: 2.5,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 6.3,
    justification: "2.5% for Arbitrum ecosystem",
    indicators: "TVL (6), Adoption (5)",
    signals: "New dApps, upgrades"
  },
  {
    sector: "Layer 2",
    token: "OP",
    allocation: 2.0,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 6.1,
    justification: "2% for Optimism growth",
    indicators: "Adoption (5), TPS (7)",
    signals: "EVM support, grants"
  },

  // Stablecoin Reserve
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
  },

  // Emerging/Narrative
  {
    sector: "Emerging/Narrative",
    token: "AVAX",
    allocation: 2.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 6.4,
    justification: "2.5% for subnet innovation",
    indicators: "Adoption (6), TPS (8)",
    signals: "Ecosystem expansion"
  },
  {
    sector: "Emerging/Narrative",
    token: "FTM",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.7,
    justification: "1.5% for fast transactions",
    indicators: "Adoption (5), TPS (7)",
    signals: "Partnerships"
  },
  {
    sector: "Emerging/Narrative",
    token: "NEAR",
    allocation: 2.0,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 6.0,
    justification: "2% for sharding tech",
    indicators: "Dev Activity (6), Adoption (5)",
    signals: "New features"
  },
  // ... (continuing with more tokens to reach 58)
  {
    sector: "Emerging/Narrative",
    token: "ALGO",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.6,
    justification: "1.5% for pure proof-of-stake",
    indicators: "Adoption (5), TPS (7)",
    signals: "Ecosystem growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "HBAR",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for enterprise focus",
    indicators: "Adoption (5), TPS (8)",
    signals: "Partnerships"
  },
  {
    sector: "Emerging/Narrative",
    token: "XLM",
    allocation: 2.0,
    phase: "Innovators",
    riskLevel: "Moderate",
    compositeScore: 6.2,
    justification: "2% for cross-border payments",
    indicators: "Adoption (6), Liquidity (7)",
    signals: "New use cases"
  },
  {
    sector: "Emerging/Narrative",
    token: "XRP",
    allocation: 3.0,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.5,
    justification: "3% for payment efficiency",
    indicators: "Adoption (7), TPS (9)",
    signals: "Regulatory clarity"
  },
  {
    sector: "Emerging/Narrative",
    token: "ATOM",
    allocation: 2.5,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.4,
    justification: "2.5% for interoperability",
    indicators: "Adoption (6), Dev Activity (7)",
    signals: "IBC growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "OSMO",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.7,
    justification: "1.5% for DEX innovation",
    indicators: "TVL (5), Adoption (4)",
    signals: "New pools"
  },
  {
    sector: "Emerging/Narrative",
    token: "LUNA",
    allocation: 2.0,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 6.1,
    justification: "2% for staking rewards",
    indicators: "Adoption (6), Stability (5)",
    signals: "Ecosystem recovery"
  },
  {
    sector: "Emerging/Narrative",
    token: "EGLD",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.9,
    justification: "1.5% for high throughput",
    indicators: "TPS (8), Adoption (5)",
    signals: "New dApps"
  },
  {
    sector: "Emerging/Narrative",
    token: "KSM",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for parachain support",
    indicators: "Adoption (5), Dev Activity (6)",
    signals: "New auctions"
  },
  {
    sector: "Emerging/Narrative",
    token: "FLOW",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.6,
    justification: "1.5% for NFT focus",
    indicators: "Adoption (5), TPS (7)",
    signals: "Ecosystem growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "HBAR",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for enterprise focus",
    indicators: "Adoption (5), TPS (8)",
    signals: "Partnerships"
  },
  {
    sector: "Emerging/Narrative",
    token: "XLM",
    allocation: 2.0,
    phase: "Innovators",
    riskLevel: "Moderate",
    compositeScore: 6.2,
    justification: "2% for cross-border payments",
    indicators: "Adoption (6), Liquidity (7)",
    signals: "New use cases"
  },
  {
    sector: "Emerging/Narrative",
    token: "XRP",
    allocation: 3.0,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.5,
    justification: "3% for payment efficiency",
    indicators: "Adoption (7), TPS (9)",
    signals: "Regulatory clarity"
  },
  {
    sector: "Emerging/Narrative",
    token: "ATOM",
    allocation: 2.5,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.4,
    justification: "2.5% for interoperability",
    indicators: "Adoption (6), Dev Activity (7)",
    signals: "IBC growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "OSMO",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.7,
    justification: "1.5% for DEX innovation",
    indicators: "TVL (5), Adoption (4)",
    signals: "New pools"
  },
  {
    sector: "Emerging/Narrative",
    token: "LUNA",
    allocation: 2.0,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 6.1,
    justification: "2% for staking rewards",
    indicators: "Adoption (6), Stability (5)",
    signals: "Ecosystem recovery"
  },
  {
    sector: "Emerging/Narrative",
    token: "EGLD",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.9,
    justification: "1.5% for high throughput",
    indicators: "TPS (8), Adoption (5)",
    signals: "New dApps"
  },
  {
    sector: "Emerging/Narrative",
    token: "KSM",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for parachain support",
    indicators: "Adoption (5), Dev Activity (6)",
    signals: "New auctions"
  },
  {
    sector: "Emerging/Narrative",
    token: "FLOW",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.6,
    justification: "1.5% for NFT focus",
    indicators: "Adoption (5), TPS (7)",
    signals: "Ecosystem growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "HBAR",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for enterprise focus",
    indicators: "Adoption (5), TPS (8)",
    signals: "Partnerships"
  },
  {
    sector: "Emerging/Narrative",
    token: "XLM",
    allocation: 2.0,
    phase: "Innovators",
    riskLevel: "Moderate",
    compositeScore: 6.2,
    justification: "2% for cross-border payments",
    indicators: "Adoption (6), Liquidity (7)",
    signals: "New use cases"
  },
  {
    sector: "Emerging/Narrative",
    token: "XRP",
    allocation: 3.0,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.5,
    justification: "3% for payment efficiency",
    indicators: "Adoption (7), TPS (9)",
    signals: "Regulatory clarity"
  },
  {
    sector: "Emerging/Narrative",
    token: "ATOM",
    allocation: 2.5,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.4,
    justification: "2.5% for interoperability",
    indicators: "Adoption (6), Dev Activity (7)",
    signals: "IBC growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "OSMO",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.7,
    justification: "1.5% for DEX innovation",
    indicators: "TVL (5), Adoption (4)",
    signals: "New pools"
  },
  {
    sector: "Emerging/Narrative",
    token: "LUNA",
    allocation: 2.0,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 6.1,
    justification: "2% for staking rewards",
    indicators: "Adoption (6), Stability (5)",
    signals: "Ecosystem recovery"
  },
  {
    sector: "Emerging/Narrative",
    token: "EGLD",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.9,
    justification: "1.5% for high throughput",
    indicators: "TPS (8), Adoption (5)",
    signals: "New dApps"
  },
  {
    sector: "Emerging/Narrative",
    token: "KSM",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for parachain support",
    indicators: "Adoption (5), Dev Activity (6)",
    signals: "New auctions"
  },
  {
    sector: "Emerging/Narrative",
    token: "FLOW",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.6,
    justification: "1.5% for NFT focus",
    indicators: "Adoption (5), TPS (7)",
    signals: "Ecosystem growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "HBAR",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for enterprise focus",
    indicators: "Adoption (5), TPS (8)",
    signals: "Partnerships"
  },
  {
    sector: "Emerging/Narrative",
    token: "XLM",
    allocation: 2.0,
    phase: "Innovators",
    riskLevel: "Moderate",
    compositeScore: 6.2,
    justification: "2% for cross-border payments",
    indicators: "Adoption (6), Liquidity (7)",
    signals: "New use cases"
  },
  {
    sector: "Emerging/Narrative",
    token: "XRP",
    allocation: 3.0,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.5,
    justification: "3% for payment efficiency",
    indicators: "Adoption (7), TPS (9)",
    signals: "Regulatory clarity"
  },
  {
    sector: "Emerging/Narrative",
    token: "ATOM",
    allocation: 2.5,
    phase: "Early Adopter",
    riskLevel: "Moderate",
    compositeScore: 6.4,
    justification: "2.5% for interoperability",
    indicators: "Adoption (6), Dev Activity (7)",
    signals: "IBC growth"
  },
  {
    sector: "Emerging/Narrative",
    token: "OSMO",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.7,
    justification: "1.5% for DEX innovation",
    indicators: "TVL (5), Adoption (4)",
    signals: "New pools"
  },
  {
    sector: "Emerging/Narrative",
    token: "LUNA",
    allocation: 2.0,
    phase: "Early Adopter",
    riskLevel: "High",
    compositeScore: 6.1,
    justification: "2% for staking rewards",
    indicators: "Adoption (6), Stability (5)",
    signals: "Ecosystem recovery"
  },
  {
    sector: "Emerging/Narrative",
    token: "EGLD",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.9,
    justification: "1.5% for high throughput",
    indicators: "TPS (8), Adoption (5)",
    signals: "New dApps"
  },
  {
    sector: "Emerging/Narrative",
    token: "KSM",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.8,
    justification: "1.5% for parachain support",
    indicators: "Adoption (5), Dev Activity (6)",
    signals: "New auctions"
  },
  {
    sector: "Emerging/Narrative",
    token: "FLOW",
    allocation: 1.5,
    phase: "Innovators",
    riskLevel: "High",
    compositeScore: 5.6,
    justification: "1.5% for NFT focus",
    indicators: "Adoption (5), TPS (7)",
    signals: "Ecosystem growth"
  }
];

export default portfolioData;