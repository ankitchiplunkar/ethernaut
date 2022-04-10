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
  const vaultAddress = "0x15025E865F2ad216AC8fdC51Da6ecBAe6ce5E473"
  console.log(deployer.address);

  const vaultFactory = await ethers.getContractFactory("Vault");
  const vault = vaultFactory.attach(vaultAddress)
  console.log('vault deployed to: ', vault.address);

  // the password is stored in the second storage slot
  const password = await ethers.provider.getStorageAt(vaultAddress, 1)
  
  const tx = await vault.unlock(password)
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
