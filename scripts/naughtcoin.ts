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
  const naughtCoinAddress = "0x2d1ad0d88E32607EEF52661895F6c5810559B479"
  console.log(deployer.address);

  const NaughtCoinFactory = await ethers.getContractFactory("NaughtCoin");
  const naughtCoin = NaughtCoinFactory.attach(naughtCoinAddress);  
  
  const NaughtCoinSolvedFactory = await ethers.getContractFactory("NaughtCoinSolved");
  const naughtCoinSolved = await NaughtCoinSolvedFactory.deploy(
    deployer.address, 
    naughtCoinAddress
  );
  await naughtCoinSolved.deployed()
  console.log('naughtCoinSolved deployed to: ', naughtCoinSolved.address);

  // approving transfer of deployer to nauhtcoin solved funds to naughtCoin
  const bal = await naughtCoin.balanceOf(deployer.address)
  console.log(bal.toString())

  /*
  let tx = await naughtCoin.approve(
    naughtCoinSolved.address,  
    bal
  )
  console.log(tx)
  let receipt = await tx.wait()
  console.log(receipt)
  
  // now withdraw funds via transferfrom
  tx = await naughtCoinSolved.emptyPlayer()
  console.log(tx)
  receipt = await tx.wait()
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
