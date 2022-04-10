// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';


async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const [deployer, deployer2] = await ethers.getSigners();
  const tokenAddress = "0xe2A5eA408CC7DbCc6cd0EbD0207aE3aB117ed916"

  console.log(deployer.address);
  const tokenFactory = await ethers.getContractFactory("Token");
  const token = tokenFactory.attach(tokenAddress);
  console.log('token deployed to: ', token.address);

  console.log((await token.balanceOf(deployer.address)).toString())
  console.log((await token.balanceOf(deployer2.address)).toString())

  /*
  // the contract does not check for underflow error
  const tx = await token.transfer(deployer2.address, "21")
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
  */
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
