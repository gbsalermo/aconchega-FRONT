import { http } from './http'
import type { CreateDwellingRequest, Dwelling, DwellingMedia, PaginatedDwellings, SearchDwellingsParams } from '../types/api'

function normalize(params: Partial<SearchDwellingsParams>) {
  const clean: Record<string, string | number | boolean> = {}
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') clean[key] = value as string | number | boolean
  })
  if (!('term' in clean)) clean.term = ''
  return clean
}

export const dwellingService = {
  async publicSearch(params: Partial<SearchDwellingsParams> = {}): Promise<PaginatedDwellings> {
    const { data } = await http.get<PaginatedDwellings>('/dwellings/public/search', { params: normalize(params) })
    return data
  },
  async authenticatedSearch(params: Partial<SearchDwellingsParams> = {}): Promise<PaginatedDwellings> {
    const { data } = await http.get<PaginatedDwellings>('/dwellings/search', { params: normalize(params) })
    return data
  },
  async adminSearch(params: Partial<SearchDwellingsParams> = {}): Promise<PaginatedDwellings> {
    const { data } = await http.get<PaginatedDwellings>('/dwellings/admin/search', { params: normalize(params) })
    return data
  },
  async getPublic(id: string): Promise<Dwelling> {
    const { data } = await http.get<Dwelling>(`/dwellings/public/${id}`)
    return data
  },
  async getAuthenticated(id: string): Promise<Dwelling> {
    const { data } = await http.get<Dwelling>(`/dwellings/${id}`)
    return data
  },
  async my(params: Partial<SearchDwellingsParams> = {}): Promise<PaginatedDwellings> {
    const { data } = await http.get<PaginatedDwellings>('/dwellings/my', { params: normalize(params) })
    return data
  },
  async create(payload: CreateDwellingRequest): Promise<Dwelling> {
    const { data } = await http.post<Dwelling>('/dwellings', payload)
    return data
  },
  async update(id: string, payload: Partial<CreateDwellingRequest>): Promise<Dwelling> {
    const { data } = await http.put<Dwelling>(`/dwellings/${id}`, payload)
    return data
  },
  async remove(id: string): Promise<void> { await http.delete(`/dwellings/${id}`) },
  async adminRemove(id: string): Promise<void> { await http.delete(`/dwellings/admin/${id}`) },
  async uploadMedia(dwellingId: string, file: File): Promise<DwellingMedia> {
    const form = new FormData()
    form.append('file', file)
    const { data } = await http.post<DwellingMedia>(`/dwellings/upload/${dwellingId}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async deleteMedia(dwellingId: string, mediaId: string): Promise<void> {
    await http.delete(`/dwellings/${dwellingId}/medias/${mediaId}`)
  },
  async adminDeleteMedia(dwellingId: string, mediaId: string): Promise<void> {
    await http.delete(`/dwellings/admin/${dwellingId}/medias/${mediaId}`)
  },
  async setCover(dwellingId: string, mediaId: string): Promise<void> {
    await http.put(`/dwellings/${dwellingId}/medias/${mediaId}/cover`)
  },
}
