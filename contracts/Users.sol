// SPDX-License-Identifier: MIT
pragma solidity >=0.4.2 <=0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Users is Ownable {
  struct User {
    string name;
    string email;
  }

  User[] users;
  
  mapping (address => uint) public userId;

  event UserAdded(string name, string email);
  event UserUpdated(string name, string email);

  function addUser(string memory _name, string memory _email) public returns (bool) {
    require(userId[msg.sender] == 0, "user is already registered.");
    users.push(User(_name, _email));
    uint id = users.length;
    userId[msg.sender] = id;
    emit UserAdded(_name, _email);
    return true;
  }

  function updateUser(string memory _name, string memory _email) onlyOwner public returns (bool) {
    require(userId[msg.sender] != 0, "user not found.");
    uint id = userId[msg.sender];
    users[id].name = _name;
    users[id].email = _email;
    return true;
  }
}
