import React, {useState} from 'react'

const ArigatoForm = ({ contract, to }) => {
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState(0)
  const onInputOfMessage = (event) => {
    setMessage(event.target.value)
  }
  const onInputOfAmount = (event) => {
    setAmount(event.target.value)
  }
  const onSubmit = async () => {
    await contract.methods.arigato(to, message, amount).send()
  }

  return (
    <>
      <fieldset>
        <label htmlFor="message">メッセージ</label>
        <input id="message" type="text" name="message" value={message} onInput={onInputOfMessage} />
      </fieldset>
      <fieldset>
        <label htmlFor="amount">コイン</label>
        <input id="amount" type="number" name="message" value={amount} min={1} max={10} onInput={onInputOfAmount} required />
      </fieldset>
      <button onClick={onSubmit}>送る</button>
    </>
  )
}

export default ArigatoForm
