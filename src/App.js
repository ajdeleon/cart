import React from 'react'
import './App.css'

import useCustomerOrder from './hooks/useCustomerOrder'

function App() {
  const [{ order, isLoading, isError }] = useCustomerOrder()
  console.log(order)
  return (
    <main>
      <header className="header__title">goCart</header>
      <section className="cart__main">
        <section className="cart__product-list">
          { isError
              ? 'There was an error loading your order data. Please try to refresh your page or contact and admin here: admin@goCart.com'
              : (
                 isLoading
                  ? 'loading...'
                  : 'data loaded'
              )
          }
        </section>
        <section className="cart__checkout">
          checkout
        </section>
      </section>
      <footer className="footer__main">Links</footer>
    </main>
  )
}

export default App
