const chainIdMap = {
  "1": {
    name: "Ethereum Mainnet",
    explorerUrl: "https://etherscan.io/address/",
  },
  "5": {
    name: "Goerli",
    explorerUrl: "https://goerli.etherscan.io/address/",
  },
  "137": {
    name: "Polygon",
    explorerUrl: "https://polygonscan.com/address/",
  },
  "80001": {
    name: "Mumbai",
    explorerUrl: "https://mumbai.polygonscan.com/address/",
  },
  "84531": {
    name: "Base Goerli",
    explorerUrl: "https://goerli.basescan.org/address/",
  },
  "42161": {
    name: "Arbitrum One",
    explorerUrl: "https://arbiscan.io/address/",
  },
  "10": {
    name: "Optimism",
    explorerUrl: "https://optimistic.etherscan.io/address/",
  },
  "420": {
    name: "Optimism Goerli Testnet",
    explorerUrl: "https://goerli-optimism.etherscan.io/address/",
  },

  "31337": {
    name: "Local Network",
    explorerUrl: "#",
  },
  "11155111": {
    name: "Sepolia",
    explorerUrl: "https://sepolia.etherscan.io/address/",
  },
} as const;

export function getExplorerUrl(
  chainId: string,
  contractAddress: string
): string {
  const contractExplorerUrl = `${
    chainIdMap[chainId as keyof typeof chainIdMap].explorerUrl
  }${contractAddress}`;
  return contractExplorerUrl;
}

export function getChainName(chainId: string): string {
  return chainIdMap[chainId as keyof typeof chainIdMap].name;
}
