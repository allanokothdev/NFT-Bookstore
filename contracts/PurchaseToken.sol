// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//NOTE: Not for real use. Test Purposes Only
contract PurchaseToken is ERC20 {

  constructor(uint _totalSupply) ERC20 ("Purchase Token", "PRCHS"){
    _mint(msg.sender, _totalSupply);
  }

}
