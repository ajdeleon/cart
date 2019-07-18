import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from './types'
import { ORDER_URL, PRODUCT_BASE_URL } from './urls'

const orderReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false }
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, products: action.payload.products, user: action.payload.user, cart: action.payload.cart}
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true }
    default:
      throw new Error()
  }
}

const useCustomerOrder = () => {
  const [updater, setUpdater] = useState('')
  const initialState = {
    products: [],
    user: {},
    cart: [],
    isLoading: false,
    isError: false
  }

  const [state, dispatch] = useReducer(orderReducer, initialState)

  useEffect(() => {
    let didNotMount = false

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT })


      try {
        //this is really bad, but doing it for time constraints
        // the lodash map is overriding the 'res' before I can save a reference so I'm just calling it again due to time constraintes
        const res = await axios.get(ORDER_URL)
        const cartRes = await axios.get(ORDER_URL)
        // location_id=6 is hardcoded for philly for now
        const productIds = res.data.cart.products.map(product => product.product_id)
        const productRes = await axios.get(`${PRODUCT_BASE_URL}?location_id=6&product_id=${productIds}`)
        
        //this doesn't work because there are duplicate keys like "quantity" in both arrays that mess things up
        const mergedProductData = _.map(res.data.cart.products, (product) => {
          return _.assign(product, _.find(productRes.data.products, ['product_id', product.product_id]))
        })

        if (!didNotMount) {
          dispatch({ type: FETCH_SUCCESS, payload: { user: res.data.user, products: mergedProductData, cart: cartRes.data.cart.products } })
        }

      } catch (err) {
        if (!didNotMount) {
          dispatch({ type: FETCH_FAILURE })
        }
      }
    }

    fetchData()

    return () => {
      didNotMount = true
    }
  }, [updater])

  return [state, setUpdater]
}

export default useCustomerOrder
