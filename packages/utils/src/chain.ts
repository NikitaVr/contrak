const chainIdMap = {
  "1": {
    name: "mainnet",
    explorerUrl: "https://etherscan.io/address/",
  },
  "84531": {
    name: "Base Goerli",
    explorerUrl: "https://goerli.basescan.org/address/",
  },
  "31337": {
    name: "Local Network",
    explorerUrl: "https://hardhat.org/",
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
