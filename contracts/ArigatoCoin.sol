// SPDX-License-Identifier: MIT
pragma solidity >=0.4.2 <=0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Users.sol";

contract ArigatoCoin is ERC20, Users {
  struct Message {
    address to;
    string message;
  }

  constructor() ERC20("ArigatoCoin", "AC") {
    _mint(msg.sender, 100);
  }

  Message[] public messages;

  event SubmittedArigato(address from, address to, string message, uint amount);

  function addUser(string memory _name, string memory _email) public returns (bool) {
    require(userId[msg.sender] == 0, "user is already registered.");
    users.push(User(_name, _email, msg.sender));
    uint id = users.length;
    userId[msg.sender] = id;
    _mint(msg.sender, 100);
    emit UserAdded(_name, _email);
    return true;
  }

  function arigato(address _to, string memory _message, uint _amount) public returns (bool) {
    require(getIsExistedUser(msg.sender), "user not found.");
    require(balanceOf(msg.sender) < 10, "coins are short supply.");
    require(getIsExistedUser(_to), "you are trying to send to a non-existent user.");

    messages.push(Message(_to, _message));
    transfer(_to, _amount);
    emit SubmittedArigato(msg.sender, _to, _message, _amount);

    return true;
  }
}
