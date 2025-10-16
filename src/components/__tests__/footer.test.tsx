import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../footer'

// Next.js의 Link 컴포넌트를 모킹
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// MemoryRouter로 감싸는 헬퍼 함수
const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe('Footer 컴포넌트', () => {
  it('푸터가 렌더링되어야 함', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('프로젝트 제목이 표시되어야 함', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText('Next.js Boilerplate')).toBeInTheDocument()
  })

  it('프로젝트 설명이 표시되어야 함', () => {
    renderWithRouter(<Footer />)

    expect(
      screen.getByText('환경별 빌드 설정이 완료된 현대적인 Next.js 프로젝트 템플릿입니다.'),
    ).toBeInTheDocument()
  })

  it('빠른 링크 섹션이 표시되어야 함', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText('빠른 링크')).toBeInTheDocument()
    expect(screen.getByText('프로젝트 소개')).toBeInTheDocument()
    expect(screen.getByText('API 테스트')).toBeInTheDocument()
  })

  it('기술 정보 섹션이 표시되어야 함', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText('기술 정보')).toBeInTheDocument()
    expect(screen.getByText('Next.js 15')).toBeInTheDocument()
    expect(screen.getByText('React 19')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
  })

  it('링크가 올바른 href를 가져야 함', () => {
    renderWithRouter(<Footer />)

    const aboutLink = screen.getByText('프로젝트 소개').closest('a')
    const apiTestLink = screen.getByText('API 테스트').closest('a')

    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(apiTestLink).toHaveAttribute('href', '/api-test')
  })

  it('올바른 CSS 클래스가 적용되어야 함', () => {
    renderWithRouter(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-white', 'border-t', 'border-gray-200', 'mt-auto')
  })

  it('반응형 그리드 레이아웃이 적용되어야 함', () => {
    renderWithRouter(<Footer />)

    const gridContainer = screen.getByText('Next.js Boilerplate').closest('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3')
  })

  it('저작권 정보가 표시되어야 함', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText('© 2025 Next.js Boilerplate.')).toBeInTheDocument()
  })

  it('링크에 호버 효과 클래스가 적용되어야 함', () => {
    renderWithRouter(<Footer />)

    const aboutLink = screen.getByText('프로젝트 소개').closest('a')
    expect(aboutLink).toHaveClass('text-gray-600', 'hover:text-gray-900', 'transition-colors')
  })
})
