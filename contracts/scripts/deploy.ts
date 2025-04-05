import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CBK Token...");

  const CBKToken = await ethers.getContractFactory("CBKToken");
  const cbkToken = await CBKToken.deploy();

  console.log("CBK Token deployed to:", await cbkToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 