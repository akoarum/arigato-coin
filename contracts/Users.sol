// SPDX-License-Identifier: MIT
pragma solidity >=0.4.2 <=0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Users is Ownable {
  struct User {
    string name;
    string email;
    address userAddress;
  }

  User[] users;
  
  mapping (address => uint) public userId;

  event UserAdded(string name, string email);
  event UserUpdated(string name, string email);
  
  function getUserByAddress(address _userAddress) view internal returns (string memory, string memory, address) {
    User memory _user = users[userId[_userAddress]];
    return (_user.name, _user.email, _user.userAddress);
  }

  function getIsExistedUser(address _userAddress) view internal returns (bool) {
    string memory _name;
    string memory _email;
    address _address;
    (_name, _email, _address) = getUserByAddress(_userAddress);
    return _address == _userAddress;
  }

  function updateUser(string memory _name, string memory _email) onlyOwner public returns (bool) {
    require(userId[msg.sender] != 0, "user not found.");
    uint id = userId[msg.sender];
    users[id].name = _name;
    users[id].email = _email;
    return true;
  }
}
