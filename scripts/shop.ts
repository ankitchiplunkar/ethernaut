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
  const [deployer] = await ethers.getSigners();
  const shopAddress = "0x2B09216624a2D38Acbc7608dDcBad6E1E28a7077"

  console.log(deployer.address);
  const ShopFactory = await ethers.getContractFactory("Shop");
  const ShopSolvedFactory = await ethers.getContractFactory("ShopSolved");
  const shop = ShopFactory.attach(shopAddress);
  console.log('shop deployed to: ', shop.address);

  const shopSolved = await ShopSolvedFactory.deploy(shop.address);
  await shopSolved.deployed()
  console.log('shopSolved deployed to: ', shop.address);

  const tx = await shopSolved.buyItem()
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
