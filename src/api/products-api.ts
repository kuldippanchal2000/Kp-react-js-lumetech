import { AxiosError } from 'axios'
import { httpClient } from './http-client'
import type { IProductsResponse } from '../types/product'

interface IProductsErrorResponse {
  message?: string
}

export const getProducts = async () => {
  try {
    const response = await httpClient.get<IProductsResponse>('/products')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseMessage = (error.response?.data as IProductsErrorResponse)?.message
      throw new Error(responseMessage ?? 'Unable to load products. Please try again.')
    }

    throw new Error('Unable to load products. Please try again.')
  }
}
