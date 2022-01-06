// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BookStore.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StoreFront {

  BookStore private _bookStore;

  //TODO Restrict access to Only Owner
  function setBookStore(address _bookStoreAddress) public {
    _bookStore = BookStore(_bookStoreAddress);
  }

  function purchaseFromAuthor(uint _bookVersionId) public {
    ERC20 purchaseToken = ERC20( _bookStore.bookVersionCurrency(_bookVersionId));

    address author = _bookStore.bookVersionAuthor(_bookVersionId);

    uint256 price = _bookStore.bookVersionPrice(_bookVersionId);

    purchaseToken.transferFrom(msg.sender, author, price);

    _bookStore.purchaseFromAuthor(msg.sender, _bookVersionId);
  }

}
