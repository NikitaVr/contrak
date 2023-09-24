const chainIdMap: { [key: string]: { name: string; explorerUrl: string } } = {
  "1": {
    name: "mainnet",
    explorerUrl: "https://etherscan.io/address/",
  },
  "84531": {
    name: "Base Goerli",
    explorerUrl: "https://goerli.basescan.org/address/",
  },
  "31337": {
    name: "Hardhat Local",
    explorerUrl: "https://hardhat.org/",
  },
};

export function getExplorerUrl(
  chainId: string,
  contractAddress: string
): string {
  console.log("getExplorerUrl", chainId, contractAddress);
  const contractExplorerUrl = `${
    chainIdMap[chainId as keyof typeof chainIdMap].explorerUrl
  }${contractAddress}`;
  return contractExplorerUrl;
}

export function getChainName(chainId: string): string {
  return chainIdMap[chainId as keyof typeof chainIdMap].name;
}
