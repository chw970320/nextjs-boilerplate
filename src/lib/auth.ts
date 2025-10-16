// src/lib/auth.ts
import axiosInstance from './axios'
import { useAuthStore } from '@/store'

export interface LoginResponse {
  user: { email: string }
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 함수 예시
 * 실제 구현 시 백엔드 API 엔드포인트에 맞게 수정하세요
 */
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    // 백엔드 API 호출 시 상대경로 사용 (baseURL 자동 적용)
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials)

    const { user, accessToken, refreshToken } = response.data

    // 두 토큰을 모두 store에 설정
    useAuthStore.getState().setTokens(accessToken, refreshToken)
    useAuthStore.getState().setUser(user, accessToken)

    return response.data
  } catch {
    throw new Error('로그인에 실패했습니다.')
  }
}

/**
 * 로그아웃 함수
 */
export function logoutUser(): void {
  useAuthStore.getState().logout()
}

/**
 * 토큰 갱신 함수 예시
 * 실제 구현 시 백엔드 API 엔드포인트에 맞게 수정하세요
 */
export async function refreshAccessToken(): Promise<string | null> {
  try {
    // refreshToken은 쿠키에서 자동으로 포함됨 (HttpOnly 쿠키이므로 직접 접근 불가)
    const response = await axiosInstance.post<{ accessToken: string }>('/auth/refresh')

    const { accessToken } = response.data

    // 새로운 accessToken만 store에 업데이트
    useAuthStore.getState().setTokens(accessToken)

    return accessToken
  } catch {
    // 토큰 갱신 실패 시 로그아웃
    logoutUser()
    return null
  }
}

/**
 * 인증된 사용자의 정보를 가져오는 함수 예시
 */
export async function getCurrentUser() {
  try {
    // 백엔드 API 호출 시 상대경로 사용 (baseURL 자동 적용)
    const response = await axiosInstance.get<{ email: string }>('/auth/me')
    return response.data
  } catch {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.')
  }
}

/**
 * 외부 API 호출 예시 (JSONPlaceholder)
 * 완전한 URL을 사용하는 경우
 */
export async function fetchExternalData() {
  try {
    // 외부 API 호출 시 완전한 URL 사용 (baseURL 무시)
    const response = await axiosInstance.get('https://jsonplaceholder.typicode.com/posts/1')
    return response.data
  } catch {
    throw new Error('외부 API 호출에 실패했습니다.')
  }
}
