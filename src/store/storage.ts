import type { ICartItem } from '../types/cart'
import type { IAuthUser } from '../types/auth'

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'
const CART_ITEMS_KEY = 'cart_items'

interface IPersistedState {
  authToken: string | null
  authUser: IAuthUser | null
  cartItems: ICartItem[]
}

export const loadPersistedState = (): IPersistedState => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const authUserValue = localStorage.getItem(AUTH_USER_KEY)
  const cartItemsValue = localStorage.getItem(CART_ITEMS_KEY)
  let authUser: IAuthUser | null = null

  if (authUserValue) {
    try {
      authUser = JSON.parse(authUserValue) as IAuthUser
    } catch (error) {
      authUser = null
    }
  }

  if (!cartItemsValue) {
    return {
      authToken,
      authUser,
      cartItems: [],
    }
  }

  try {
    const parsedItems = JSON.parse(cartItemsValue) as ICartItem[]
    return {
      authToken,
      authUser,
      cartItems: parsedItems,
    }
  } catch (error) {
    return {
      authToken,
      authUser,
      cartItems: [],
    }
  }
}

export const savePersistedState = (
  authToken: string | null,
  authUser: IAuthUser | null,
  cartItems: ICartItem[],
) => {
  if (authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken)
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  if (authUser) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser))
  } else {
    localStorage.removeItem(AUTH_USER_KEY)
  }

  if (cartItems.length > 0) {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems))
  } else {
    localStorage.removeItem(CART_ITEMS_KEY)
  }
}
