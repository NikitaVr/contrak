import "dotenv/config";

import { ethers } from "hardhat";
import { connect } from "@midna/sdk";

const CONTRACT_HISTORY_ID = "f131f1f0-1822-42da-8a50-390d659ba850"

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const contractName = "Manager";

  const lock = await ethers.deployContract(contractName, [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );

  // NEW MIDNA CODE

  const deploymentTransaction = lock.deploymentTransaction();

  if (!deploymentTransaction) {
    throw new Error("Deployment transaction not found");
  }

  const contractAddress = await lock.getAddress();

  const orgPublicKey = process.env.ORG_PUBLIC_KEY;

  if (!orgPublicKey) {
    throw new Error(
      "Organization public key not found in environment variables"
    );
  }

  connect({
    contractName,
    contractHistoryId: CONTRACT_HISTORY_ID,
    chainID: deploymentTransaction.chainId.toString(),
    contractAddress: contractAddress,
    contractDeploymentTransactionHash: deploymentTransaction.hash,
    orgPublicKey: orgPublicKey,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
