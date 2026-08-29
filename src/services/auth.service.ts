import { http } from './http'
import type { CreateAccountRequest, LoginRequest, LoginResponse, User } from '../types/api'

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>('/accounts/login', payload)
    return data
  },
  async register(payload: CreateAccountRequest): Promise<User> {
    const { data } = await http.post<User>('/accounts', payload)
    return data
  },
  async confirm(token: string): Promise<void> {
    await http.post('/accounts/confirm', undefined, { params: { token } })
  },
  async resendConfirmation(email: string) {
    const { data } = await http.post('/accounts/regenerate', { email })
    return data as { message?: string }
  },
  async requestPasswordRecovery(email: string) {
    const { data } = await http.post('/accounts/recover', { email })
    return data as { message?: string }
  },
  async resetPassword(token: string, password: string) {
    const { data } = await http.post('/accounts/password-recovery', { token, password })
    return data as { message?: string }
  },
}
