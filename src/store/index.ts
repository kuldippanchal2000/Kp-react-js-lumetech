import { configureStore } from '@reduxjs/toolkit'
import { authReducer, hydrateAuth } from './auth-slice'
import { cartReducer, hydrateCart } from './cart-slice'
import { loadPersistedState, savePersistedState } from './storage'

const persistedState = loadPersistedState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
})

store.dispatch(
  hydrateAuth({
    token: persistedState.authToken,
    user: persistedState.authUser,
    isAuthenticated: Boolean(persistedState.authToken),
  }),
)
store.dispatch(hydrateCart(persistedState.cartItems))

store.subscribe(() => {
  const state = store.getState()
  savePersistedState(state.auth.token, state.auth.user, state.cart.items)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
