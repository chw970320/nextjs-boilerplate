// src/store/auth-store.ts
import { create } from 'zustand'

/* eslint-disable */
// refreshToken을 쿠키에서 읽어오는 유틸리티 함수
const getRefreshTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'refreshToken') {
      return value
    }
  }
  return null
}

// accessToken을 localStorage에서 읽어오는 유틸리티 함수 (하위 호환성을 위해)
const getAccessTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

interface AuthState {
  user: { email: string } | null
  accessToken: string | null
  isLoading: boolean
  setUser(user: { email: string } | null, accessToken: string | null): void
  setTokens(accessToken: string | null, refreshToken?: string | null): void
  logout(): void
  // 초기화 시 기존 토큰 복원 (하위 호환성)
  initializeFromStorage(): void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  setUser: (user, accessToken) => {
    set({ user, accessToken })
  },
  setTokens: (accessToken, refreshToken) => {
    // accessToken은 메모리에만 저장
    set({ accessToken })

    // refreshToken은 HttpOnly 쿠키에 저장
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly; Secure; SameSite=Strict`
    } else {
      // refreshToken 제거
      document.cookie =
        'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
    }
  },
  logout: () => {
    // accessToken은 메모리에서 제거
    set({ user: null, accessToken: null })

    // refreshToken 쿠키 제거
    document.cookie =
      'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
  },
  initializeFromStorage: () => {
    // 하위 호환성을 위해 기존 localStorage에서 accessToken 확인
    const storedToken = getAccessTokenFromStorage()
    if (storedToken) {
      set({ accessToken: storedToken })
    }
  },
}))
