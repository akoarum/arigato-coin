const Users = artifacts.require('Users')
const ArigatoCoin = artifacts.require('ArigatoCoin')

module.exports = function (deployer) {
  deployer.deploy(Users)
  deployer.deploy(ArigatoCoin)
}
