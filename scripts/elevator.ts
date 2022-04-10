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
  const elevatorAddress = "0xD2A151221914Da3551e18bfc9523Cf5a7cf1E43F"
  console.log(deployer.address);

  const ElevatorFactory = await ethers.getContractFactory("Elevator");
  const elevator = ElevatorFactory.attach(elevatorAddress);
  
  console.log((await elevator.top()))
  console.log((await elevator.floor()))
  
  const ElevatorSolvedFactory = await ethers.getContractFactory("ElevatorSolved");
  const elevatorSolved = await ElevatorSolvedFactory.deploy(
    elevatorAddress,
  );
  await elevatorSolved.deployed()
  console.log('elevatorSolved deployed to: ', elevatorSolved.address);
  
  // isLastFloor changes state mid execution
  const tx = await elevatorSolved.goTo(10)
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)
  
  console.log((await elevator.top()))
  console.log((await elevator.floor()))
  
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
