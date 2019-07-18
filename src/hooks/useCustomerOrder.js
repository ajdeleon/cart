import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from './types'
import { ORDER_URL, PRODUCT_BASE_URL } from './urls'

const orderReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false }
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, order: action.payload }
    case FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true }
    default:
      throw new Error()
  }
}

const useCustomerOrder = () => {
  const [updater, setUpdater] = useState('')
  const initialState = {
    order: {},
    isLoading: false,
    isError: false
  }

  const [state, dispatch] = useReducer(orderReducer, initialState)

  useEffect(() => {
    let didNotMount = false

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT })


      try {
        const res = await axios.get(ORDER_URL)

        if (!didNotMount) {
          dispatch({ type: FETCH_SUCCESS, payload: res.data })
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
