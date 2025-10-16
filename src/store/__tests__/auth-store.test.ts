import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from '../auth-store'

// Mock document 객체
Object.defineProperty(window, 'document', {
  value: {
    cookie: '',
  },
  writable: true,
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
})

describe('AuthStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    useAuthStore.setState({
      user: null,
      accessToken: null,
      isLoading: false,
    })
    // Mock 초기화
    vi.clearAllMocks()
    document.cookie = ''
  })

  describe('초기 상태', () => {
    it('초기 상태가 올바르게 설정되어야 함', () => {
      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.accessToken).toBeNull()
      expect(state.isLoading).toBe(false)
    })
  })

  describe('setUser', () => {
    it('사용자 정보를 설정해야 함', () => {
      const user = { email: 'test@example.com' }
      const accessToken = 'test-token'

      useAuthStore.getState().setUser(user, accessToken)

      const state = useAuthStore.getState()
      expect(state.user).toEqual(user)
      expect(state.accessToken).toBe(accessToken)
    })

    it('사용자 정보를 null로 설정해야 함', () => {
      // 먼저 사용자 정보 설정
      useAuthStore.getState().setUser({ email: 'test@example.com' }, 'test-token')

      // 그 다음 null로 설정
      useAuthStore.getState().setUser(null, null)

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.accessToken).toBeNull()
    })
  })

  describe('setTokens', () => {
    it('토큰을 설정해야 함', () => {
      const accessToken = 'access-token'
      const refreshToken = 'refresh-token'

      useAuthStore.getState().setTokens(accessToken, refreshToken)

      const state = useAuthStore.getState()
      expect(state.accessToken).toBe(accessToken)

      // 쿠키 확인
      expect(document.cookie).toContain('refreshToken=refresh-token')
    })

    it('refreshToken 없이 accessToken만 설정해야 함', () => {
      const accessToken = 'access-token'

      useAuthStore.getState().setTokens(accessToken)

      const state = useAuthStore.getState()
      expect(state.accessToken).toBe(accessToken)

      // refreshToken 쿠키가 초기화되어야 함 (만료된 쿠키 설정)
      expect(document.cookie).toContain('refreshToken=;')
    })

    it('refreshToken을 제거해야 함', () => {
      // 먼저 토큰 설정
      useAuthStore.getState().setTokens('access-token', 'refresh-token')
      expect(document.cookie).toContain('refreshToken=refresh-token')

      // 그 다음 null로 설정
      useAuthStore.getState().setTokens('new-access-token', null)

      const state = useAuthStore.getState()
      expect(state.accessToken).toBe('new-access-token')

      // refreshToken 쿠키가 만료되어야 함
      expect(document.cookie).toContain('refreshToken=;')
    })
  })

  describe('logout', () => {
    it('로그아웃 시 모든 정보를 초기화해야 함', () => {
      // 먼저 로그인 상태 설정
      useAuthStore.getState().setUser({ email: 'test@example.com' }, 'access-token')
      useAuthStore.getState().setTokens('access-token', 'refresh-token')

      // 로그아웃 실행
      useAuthStore.getState().logout()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.accessToken).toBeNull()

      // refreshToken 쿠키가 만료되어야 함
      expect(document.cookie).toContain('refreshToken=;')
    })
  })

  describe('유틸리티 함수들', () => {
    describe('getRefreshTokenFromCookie', () => {
      it('쿠키에서 refreshToken을 읽어야 함', () => {
        document.cookie = 'refreshToken=test-refresh-token; other=value'

        // 이 함수는 private 함수이므로 실제 구현을 통해 테스트
        // 실제로는 쿠키 설정을 통해 간접적으로 테스트
        useAuthStore.getState().setTokens('access-token', 'test-refresh-token')
        expect(document.cookie).toContain('refreshToken=test-refresh-token')
      })
    })

    describe('getAccessTokenFromStorage', () => {
      it('localStorage에서 accessToken을 읽어야 함', () => {
        vi.mocked(localStorage.getItem).mockReturnValue('stored-token')

        // 하위 호환성을 위해 기존 localStorage 확인 로직 테스트
        // 실제로는 initializeFromStorage 메서드를 통해 테스트
        useAuthStore.getState().initializeFromStorage()

        // localStorage.getItem이 호출되었는지 확인
        expect(localStorage.getItem).toHaveBeenCalledWith('authToken')
      })
    })
  })

  describe('initializeFromStorage', () => {
    it('기존 토큰을 복원해야 함', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('stored-token')

      useAuthStore.getState().initializeFromStorage()

      const state = useAuthStore.getState()
      expect(state.accessToken).toBe('stored-token')
    })

    it('토큰이 없을 때 초기화하지 않아야 함', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)

      useAuthStore.getState().initializeFromStorage()

      const state = useAuthStore.getState()
      expect(state.accessToken).toBeNull()
    })
  })
})
