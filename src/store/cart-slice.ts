import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartItem, TCartProduct } from '../types/cart'

interface ICartState {
  items: ICartItem[]
}

interface IAddToCartPayload {
  product: TCartProduct
  quantity: number
}

const initialState: ICartState = {
  items: [],
}

const getUpdatedItems = (
  items: ICartItem[],
  productId: number,
  quantityChange: number,
  maxStock?: number,
) => {
  return items.reduce<ICartItem[]>((accumulator, item) => {
    if (item.productId !== productId) {
      accumulator.push(item)
      return accumulator
    }

    const rawNextQuantity = item.quantity + quantityChange
    const allowedMaxQuantity = maxStock ?? item.stock ?? Number.POSITIVE_INFINITY
    const nextQuantity = Math.min(rawNextQuantity, allowedMaxQuantity)

    if (nextQuantity > 0) {
      accumulator.push({
        ...item,
        quantity: nextQuantity,
      })
    }

    return accumulator
  }, [])
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const { product, quantity } = action.payload
      if (quantity <= 0) {
        return
      }

      const existingItem = state.items.find((item) => item.productId === product.id)
      const allowedQuantity = Math.min(quantity, product.stock)
      if (allowedQuantity <= 0) {
        return
      }

      if (existingItem) {
        state.items = getUpdatedItems(
          state.items,
          product.id,
          allowedQuantity,
          product.stock,
        )
        return
      }

      state.items.push({
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity: allowedQuantity,
        stock: product.stock,
      })
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state.items = getUpdatedItems(state.items, action.payload, 1)
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      state.items = getUpdatedItems(state.items, action.payload, -1)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
    hydrateCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload
    },
  },
})

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  hydrateCart,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer
