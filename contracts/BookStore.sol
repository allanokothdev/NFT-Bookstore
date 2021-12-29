// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BookStore is ERC1155 {

  uint256 private _currentBookVersionId;

  mapping (uint => uint) private _bookVersionPrices;

  constructor() ERC1155("https://example.com/api/{id}.json") {
    _currentBookVersionId = 1;
  }

  function publish(uint256 _quantity, uint256 _price, address _currency) public {
    _mint(msg.sender, _currentBookVersionId, _quantity, "");
    _bookVersionPrices[_currentBookVersionId] = _price;
    _currentBookVersionId += 1;
  }

  function bookVersionPrice(uint256 _bookVersionId) public view returns (uint256) {
    return _bookVersionPrices[_bookVersionId];
  }
}