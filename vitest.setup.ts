import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// React Testing Library 매처 확장
expect.extend(matchers)

// 각 테스트 후 cleanup
afterEach(() => {
  cleanup()
})

// Next.js 라우터 모킹
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// 환경 변수 모킹
Object.defineProperty(window, 'ENV', {
  value: {
    BACKEND_API_URL: 'http://localhost:3001',
  },
  writable: true,
})

// console.error 모킹 (테스트 중 예상치 못한 에러 메시지 숨김)
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning: ReactDOM.render is deprecated')) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
