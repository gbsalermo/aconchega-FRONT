import { http } from './http'
import type { PaginatedUsers, UpdateAccountRequest, User } from '../types/api'

export const accountService = {
  async me(): Promise<User> {
    const { data } = await http.get<User>('/accounts/profile')
    return data
  },
  async update(payload: UpdateAccountRequest): Promise<Partial<User>> {
    const { data } = await http.put('/accounts/profile', payload)
    return data
  },
  async uploadPhoto(photo: File): Promise<{ id: string; photoUrl: string }> {
    const form = new FormData()
    form.append('photo', photo)
    const { data } = await http.put('/accounts/profile/picture', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async deletePhoto(): Promise<void> { await http.delete('/accounts/profile/picture') },
  async deleteOwnAccount(): Promise<void> { await http.delete('/accounts') },
  async listUsers(params: { page?: number; name?: string; email?: string; role?: string } = {}): Promise<PaginatedUsers> {
    const { data } = await http.get<PaginatedUsers>('/accounts', { params })
    return data
  },
  async getUser(id: string): Promise<User> {
    const { data } = await http.get<User>(`/accounts/profile/${id}`)
    return data
  },
  async updateUser(id: string, payload: Partial<User>): Promise<User> {
    const { data } = await http.put<User>(`/accounts/${id}`, payload)
    return data
  },
  async banUser(id: string, reason: string): Promise<void> { await http.post(`/accounts/ban/${id}`, { reason }) },
  async unbanUser(id: string): Promise<User> {
    const { data } = await http.delete<User>(`/accounts/ban/${id}`)
    return data
  },
  async deleteUser(id: string): Promise<void> { await http.delete(`/accounts/${id}`) },
}
