// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { Fallout__factory } from "../typechain";


async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();
  const falloutAddress = "0xbbED59BBE84d1D43cA5E43F91EE177b4ea81e280"

  console.log(deployer.address);
  const FalloutFactory = new Fallout__factory(deployer);
  const fallout = FalloutFactory.attach(falloutAddress);
  console.log('fallout deployed to: ', fallout.address);

  /* call fal1out */
  const tx = await fallout.connect(deployer).Fal1out()
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)

  console.log((await fallout.owner()))
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
