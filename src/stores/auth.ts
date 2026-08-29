import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '../services/auth.service'
import { accountService } from '../services/account.service'
import type { LoginRequest, User } from '../types/api'

const TOKEN_KEY = 'aconchega_token'
const USER_KEY = 'aconchega_user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const isAuthenticated = computed(() => Boolean(token.value))
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const isConfirmed = computed(() => Boolean(user.value?.confirmed))

  function persist() {
    token.value ? localStorage.setItem(TOKEN_KEY, token.value) : localStorage.removeItem(TOKEN_KEY)
    user.value ? localStorage.setItem(USER_KEY, JSON.stringify(user.value)) : localStorage.removeItem(USER_KEY)
  }

  function restore() {
    token.value = localStorage.getItem(TOKEN_KEY)
    const raw = localStorage.getItem(USER_KEY)
    if (raw) {
      try { user.value = JSON.parse(raw) as User } catch { user.value = null }
    }
  }

  async function login(payload: LoginRequest) {
    loading.value = true
    try {
      const response = await authService.login(payload)
      token.value = response.token
      user.value = response
      persist()
      return response
    } finally { loading.value = false }
  }

  async function refreshProfile() {
    if (!token.value) return null
    const profile = await accountService.me()
    user.value = { ...user.value, ...profile } as User
    persist()
    return user.value
  }

  function logout() { token.value = null; user.value = null; persist() }

  return { user, token, loading, isAuthenticated, isAdmin, isConfirmed, login, logout, restore, refreshProfile }
})
