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
  const forceAddress = "0x23fa4eFf0d0E75d9E9CC7E0d2ccCA37CC3DDe502"
  console.log(deployer.address);

  const ForceSolvedFactory = await ethers.getContractFactory("ForceSolved");
  const forceSolved = await ForceSolvedFactory.deploy({
    value: parseEther("0.0001"), 
    gasLimit: parseUnits("100000", "1")
  });
  await forceSolved.deployed()
  console.log('forceSolved deployed to: ', forceSolved.address);

  // suiciding a contract can send funds to receiver contract
  // the fallback function of the receiver function is not called in this case
  const tx = await forceSolved.kill(forceAddress)
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
