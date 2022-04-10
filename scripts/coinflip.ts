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
  const coinflipAddress = "0xa4Dc963f8a7175bc02Af47a2eF76884F98A370e5"

  console.log(deployer.address);
  const CoinFlipFactory = await ethers.getContractFactory("CoinFlip");
  const coinflip = CoinFlipFactory.attach(coinflipAddress);
  console.log('coinflip deployed to: ', coinflip.address);

  // The coinflip random number is not random
  const factor = ethers.BigNumber.from("57896044618658097711785492504343953926634992332820282019728792003956564819968")
  const block = await ethers.provider.getBlock("latest")
  const hashNumber = ethers.BigNumber.from(block.hash)
  
  const tx = await coinflip.flip(hashNumber.div(factor))
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
