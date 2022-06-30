import React, { useState, useEffect } from 'react'
import AddUser from '../components/AddUser'
import Users from '../components/Users'

const Top = ({ drizzle, drizzleState }) => {
  const [balance, setBalance] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const contract = drizzle.contracts.ArigatoCoin
  const account = drizzleState.accounts[0]
  const setBalanceOfAC = async () => {
    const balanceOf = await contract.methods.balanceOf(account).call()
    setBalance(balanceOf)
  }
  const getUser = async () => {
    const res = await contract.methods.userId(account).call()
    if (Number(res) > 0) setIsLoggedIn(true)
  }

  useEffect(() => {
    setBalanceOfAC()
    getUser()

    contract.events.SubmittedArigato().subscribe((_, event) => {
      if (event.returnValues.to !== account) return
      setBalanceOfAC()
    })
    
    contract.events.Transfer().subscribe(() => {
      setBalanceOfAC()
    })
  }, [])
  
  return (
    <div>
      <section>
        <h2>Active Account</h2>
        <p>アドレス：{account}</p>
        <p>残金：{balance}</p>
      </section>

      {!isLoggedIn ? <AddUser contract={contract} /> : <Users account={account} contract={contract} />}
    </div>
  )
}

export default Top
