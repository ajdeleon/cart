import React from 'react'

const Checkout = ({ cart }) => {
    const total = cart.reduce((acc, item, i) => {
    return acc + ( item.price * item.quantity )
  },null)

  console.log(total)
  return (
    <>
      <p>Checkout</p>
      <p>Total: ${total ? total.toFixed(2) : 'calculating total'}</p>
    </>
  )
}

export default Checkout
