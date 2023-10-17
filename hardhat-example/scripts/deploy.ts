import "dotenv/config";

import { ethers } from "hardhat";
import { connect } from "@contrak/sdk";

const CONTRACT_HISTORY_ID = "143d0bde-5383-427d-8ea4-3b8178b11fac";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const contractName = "Lock";

  const feeData = await ethers.provider.getFeeData();

  const lock = await ethers.deployContract(contractName, [unlockTime], {
    value: lockedAmount,
    gasPrice: feeData.maxFeePerGas,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );

  // NEW CONTRAK CODE

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
