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
  const telephoneAddress = "0x128166A27eD75826C7D83733669620Ae634Ef44F"

  console.log(deployer.address);
  const TelephoneFactory = await ethers.getContractFactory("Telephone");
  const TelephoneSolvedFactory = await ethers.getContractFactory("TelephoneSolved");
  const telephone = TelephoneFactory.attach(telephoneAddress);
  console.log('telephone deployed to: ', telephone.address);

  const telephoneSolved = await TelephoneSolvedFactory.deploy(telephone.address);
  await telephoneSolved.deployed()
  console.log('telephoneSolved deployed to: ', telephone.address);

  const tx = await telephoneSolved.claim(deployer.address)
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
