import { http } from './http'
import type { PlatformLimits, PlatformStatistics } from '../types/api'

export const platformService = {
  async limits(): Promise<PlatformLimits> {
    const { data } = await http.get<PlatformLimits>('/platform/limits')
    return data
  },
  async statistics(): Promise<PlatformStatistics> {
    const { data } = await http.get<PlatformStatistics>('/platform/statistics')
    return data
  },
}
