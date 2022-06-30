import React, { useState, useEffect, useMemo } from 'react'
import ArigatoForm from './ArigatoForm'

const Users = ({ contract, account }) => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    const res = await contract.methods.getUsers().call()
    setUsers(res)
  }
  const Users = useMemo(() => {
    return users.filter((user) => user.userAddress !== account).map((user) => {
      return (
        <li key={user.email}>
          {user.name}
          <ArigatoForm contract={contract} to={user.userAddress} />
        </li>
      )
    })
  }, [users])

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <section>
      <h2>ユーザー一覧</h2>
      <ul>
        {Users}
      </ul>
    </section>
  )
}

export default Users
