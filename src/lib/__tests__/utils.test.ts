import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn 유틸리티 함수', () => {
  it('단일 클래스 이름을 반환해야 함', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('여러 클래스 이름을 병합해야 함', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })

  it('조건부 클래스를 처리해야 함', () => {
    expect(cn('text-red-500', true && 'bg-blue-500', false && 'text-green-500')).toBe(
      'text-red-500 bg-blue-500',
    )
  })

  it('undefined와 null 값을 필터링해야 함', () => {
    expect(cn('text-red-500', undefined, null, 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })

  it('객체 형태의 조건부 클래스를 처리해야 함', () => {
    expect(cn('text-red-500', { 'bg-blue-500': true, 'text-green-500': false })).toBe(
      'text-red-500 bg-blue-500',
    )
  })

  it('중복 클래스를 제거해야 함', () => {
    expect(cn('text-red-500', 'text-red-500')).toBe('text-red-500')
  })

  it('빈 문자열과 배열을 처리해야 함', () => {
    expect(cn('', [])).toBe('')
    expect(cn('text-red-500', '')).toBe('text-red-500')
  })
})
