import React, { useState } from 'react'

const AddUser = ({ contract }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const onInputOfName = (event) => {
    setName(event.target.value)
  }
  const onInputOfEmail = (event) => {
    setEmail(event.target.value)
  }
  const onClick = async () => {
    await contract.methods.addUser(name, email).send()
    setName('')
    setEmail('')
  }
  
  return (
    <section>
      <h2>ユーザー登録</h2>
      <fieldset>
        <label htmlFor="name">名前</label>
        <input id="name" type="text" name="name" required onInput={onInputOfName} />
      </fieldset>
      <fieldset>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" name="email" required onInput={onInputOfEmail} />
      </fieldset>
      <button onClick={onClick}>送信</button>
    </section>
  )
}

export default AddUser
