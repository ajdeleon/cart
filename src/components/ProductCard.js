import React from 'react'

const ProductCart = ({ id, image, name, description, price, discount, credit_coupon_price, quantity, product_id, avatar }) => {
  return (
    <li key={product_id}>
      <div className="product-card__main">
        {/* why is avatar not available immediately? */}
        {avatar ? <img src={avatar.thumb} alt={name} className="product-card__image" /> : '' }
        <div className="product-card__description">
          <h4>{name}</h4>
          <div dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
        <div className="product-card__checkout">
          { credit_coupon_price ? <div><strike>Price: {price}</strike></div> : <div>Price: {price}</div> }
          { credit_coupon_price ? <div className="product-card__price--discounted">Credit coupon price: {credit_coupon_price}</div> : '' }
          <div>Quantity: {quantity}</div>
        </div>
      </div>
    </li>
  )
}

export default ProductCart
