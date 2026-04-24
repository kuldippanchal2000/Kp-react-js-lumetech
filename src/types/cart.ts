import type { IProduct } from './product'

export interface ICartItem {
  productId: number
  title: string
  thumbnail: string
  price: number
  quantity: number
  stock?: number
}

export type TCartProduct = Pick<
  IProduct,
  'id' | 'title' | 'thumbnail' | 'price' | 'stock'
>
