import React from 'react'
import './App.css'

import useCustomerOrder from './hooks/useCustomerOrder'
import ProductCard from './components/ProductCard'
import Checkout from './components/Checkout'

function App() {
  const [{ products, user, cart, isLoading, isError }] = useCustomerOrder()
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
                : (
                  <ul style={{listStyle: 'none'}}>
                    {products.map(product => <ProductCard {...product} key={product.product_id} />)}
                  </ul>
                )
              )
          }
        </section>
        <section className="cart__checkout">
          <Checkout cart={cart}/>
        </section>
      </section>
      <footer className="footer__main">Links</footer>
    </main>
  )
}

export default App
