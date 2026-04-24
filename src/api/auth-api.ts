import { AxiosError } from 'axios'
import { httpClient } from './http-client'
import type { ILoginPayload, ILoginResponse } from '../types/auth'

interface IAuthErrorResponse {
  message?: string
}

export const loginRequest = async (
  payload: ILoginPayload,
): Promise<ILoginResponse> => {
  try {
    const response = await httpClient.post<ILoginResponse>('/auth/login', payload)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseMessage = (error.response?.data as IAuthErrorResponse)?.message
      throw new Error(responseMessage ?? 'Invalid username or password.')
    }

    throw new Error('Invalid username or password.')
  }
}
