export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  stock: number
  thumbnail: string
  images: string[]
}

export interface IProductsResponse {
  products: IProduct[]
}
