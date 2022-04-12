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
  const recoveryAddress = "0x886fA57F01868c838A230389470E1348A0706Bb8"
  // recovered the contract address from etherscan internal transactions
  const simpleTokenAddress = "0xe62B4995EB51909cDa1e222F6F82dC72C94ED13e"
  console.log(deployer.address);

  const SimpleTokenFactory = await ethers.getContractFactory("SimpleToken");
  const simpleToken = SimpleTokenFactory.attach(simpleTokenAddress);
  console.log('simpleToken deployed to: ', simpleToken.address);

  // using the destroy function in the contract to send funds back to deployer
  const tx = await simpleToken.destroy(deployer.address)
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
