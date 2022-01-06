// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./StoreFront.sol";

contract BookStore is ERC1155 {

  uint256 private _currentBookVersionId;

  StoreFront private _storeFront;

  mapping (uint => BookVersion) private _bookVersions;

  struct BookVersion {
    uint price;
    address currency;
    address author;

  }

  constructor(address _storeFrontAddress) ERC1155("https://example.com/api/{id}.json")  {
    _storeFront = StoreFront(_storeFrontAddress);
    _currentBookVersionId = 1;
  }

  function publish(uint256 _quantity, uint256 _price, address _currency) public {
    _mint(msg.sender, _currentBookVersionId, _quantity, "");

    _bookVersions[_currentBookVersionId]= BookVersion(_price, _currency, msg.sender);

    _currentBookVersionId += 1;
  }

  function purchaseFromAuthor(address _buyer, uint _bookVersionId) public {
    require(msg.sender == address(_storeFront), "Method can only be called by Store Front Contract");
    BookVersion memory bookVersion = _bookVersions[_bookVersionId];
    safeTransferFrom(bookVersion.author, _buyer, _bookVersionId, 1, "");
  }

  function bookVersionPrice(uint256 _bookVersionId) public view returns (uint256) {
    return _bookVersions[_bookVersionId].price;
  }

  function bookVersionCurrency(uint256 _bookVersionId) public view returns (address) {
    return _bookVersions[_bookVersionId].currency;
  }

  function bookVersionAuthor(uint256 _bookVersionId) public view returns (address) {
    return _bookVersions[_bookVersionId].author;
  }
}
