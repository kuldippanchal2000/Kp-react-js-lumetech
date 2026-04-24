import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IAuthUser } from '../types/auth'

interface IAuthSessionPayload {
  token: string
  user: IAuthUser
}

interface IAuthState {
  token: string | null
  user: IAuthUser | null
  isAuthenticated: boolean
}

const initialState: IAuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSession: (state, action: PayloadAction<IAuthSessionPayload>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },
    hydrateAuth: (state, action: PayloadAction<IAuthState>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
    },
  },
})

export const { setAuthSession, logout, hydrateAuth } = authSlice.actions
export const authReducer = authSlice.reducer
