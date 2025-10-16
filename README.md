# Next.js 보일러플레이트 프로젝트

## 🚀 소개

이 프로젝트는 Next.js 기반의 보일러플레이트입니다. 최신 웹 개발 트렌드와 효율적인 개발 환경을 위해 다음과 같은 기술 스택과 개발 규칙을 적용하여 구성되었습니다.

## ✨ 주요 특징

- **Next.js App Router**: SSR(Server-Side Rendering) 및 RSC(React Server Components)를 적극 활용하여 성능 최적화.
- **TypeScript**: 타입 안정성을 통한 견고한 코드 작성.
- **Tailwind CSS v4**: 유틸리티 우선(utility-first) 방식으로 빠르고 유연한 UI 개발.
- **Lucide React**: 아름답고 일관된 아이콘 시스템.
- **Zustand**: 간편하고 강력한 클라이언트 상태 관리 (v5.0.8).
- **TanStack React Query**: 서버 상태 관리 및 데이터 캐싱 (v5.90.3).
- **Zod**: 런타임 타입 검증을 통한 데이터 유효성 보장.
- **Axios**: 토큰 기반 인증이 포함된 효율적인 API 통신.
- **Vitest**: 현대적이고 빠른 단위 테스트 프레임워크.
- **TDD 기반 개발**: 테스트 우선 개발 접근법으로 코드 품질 보장.
- **컬로케이션 패턴**: 테스트와 구현 코드의 물리적 인접성을 통한 유지보수성 향상.
- **강력한 폴백 시스템**: 404, 에러, 글로벌 에러 등 다양한 상황에 대한 사용자 친화적 폴백 페이지.
- **코드 품질 도구**: ESLint, Prettier, Husky, lint-staged를 통한 일관된 코드 스타일 및 품질 유지.

## 🛠️ 기술 스택

- **프레임워크**: Next.js App Router (v15.5.5)
- **언어**: TypeScript
- **런타임**: Node.js (최신 LTS)
- **UI 라이브러리**: React (v19.1.0), Lucide React (아이콘)
- **스타일링**: Tailwind CSS v4, tailwind-merge, tailwindcss-animate
- **패키지 관리**: pnpm
- **상태 관리**: Zustand (v5.0.8) - 클라이언트 상태
- **서버 상태 관리**: TanStack React Query (v5.90.3) - 서버 상태 및 캐싱
- **데이터 유효성 검사**: Zod (v4.1.12) - 런타임 타입 검증
- **API 통신**: Axios (v1.12.2) - HTTP 클라이언트
- **컴포넌트 개발**: Class Variance Authority (CVA) - 조건부 스타일링
- **유틸리티**: clsx - 조건부 클래스 병합
- **테스팅 프레임워크**: Vitest (v3.2.4)
- **테스트 라이브러리**:
  - @testing-library/react (v16.3.0)
  - @testing-library/jest-dom (v6.9.1)
  - @testing-library/user-event (v14.6.1)
  - jsdom (v27.0.0)
- **코드 품질 도구**:
  - ESLint (v9)
  - Prettier (v3.6.2)
  - Husky (v9.1.7) - Git 훅 관리
  - lint-staged (v16.2.4) - staged 파일 linting
- **SEO**: next-seo (v6.8.0)
- **이미지 최적화**: next/image

## 📂 프로젝트 구조

```
nextjs-boilerplate/
├── src/
│   ├── app/                    # Next.js App Router 엔트리 (페이지, 레이아웃)
│   │   ├── about/
│   │   ├── api-test/
│   │   ├── error.tsx           # 페이지별 에러 폴백
│   │   ├── global-error.tsx    # 글로벌 에러 폴백
│   │   ├── not-found.tsx       # 404 페이지 폴백
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   │   ├── __tests__/          # 컴포넌트 테스트 파일들
│   │   ├── error-boundary.tsx  # 에러 바운더리 컴포넌트
│   │   ├── footer.tsx
│   │   ├── image-with-fallback.tsx # 이미지 폴백 컴포넌트
│   │   ├── index.ts
│   │   ├── loading.tsx
│   │   └── navigation.tsx
│   ├── features/               # 도메인별 기능 단위 (예: 사용자 관리, 인증)
│   │   ├── index.ts
│   │   └── user/
│   │       ├── index.ts
│   │       └── useUserProfile.ts
│   ├── lib/                    # 헬퍼 함수, 유틸리티, API 클라이언트
│   │   ├── __tests__/          # 유틸리티 함수 테스트 파일들
│   │   ├── auth.ts
│   │   ├── axios.ts
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── middleware/             # Next.js 미들웨어
│   ├── static/                 # 정적 데이터 및 이미지 파일들
│   ├── store/                  # 전역 상태 관리 (Zustand 스토어)
│   │   ├── __tests__/          # 스토어 테스트 파일들
│   │   ├── auth-store.ts
│   │   ├── index.ts
│   │   └── loading-store.ts
│   ├── styles/                 # 글로벌/커스텀 Tailwind 스타일
│   └── types/                  # 공통 TypeScript 인터페이스, 타입 정의
├── public/                     # 퍼블릭 정적 리소스
│   └── static/
├── tests/                      # 통합 테스트 (현재 사용하지 않음)
├── coverage/                   # 테스트 커버리지 리포트
├── node_modules/               # 의존성 패키지들
├── components.json             # shadcn/ui 설정 파일
├── eslint.config.mjs          # ESLint 설정 파일
├── next.config.ts             # Next.js 설정 파일
├── package.json               # 프로젝트 설정 및 의존성
├── pnpm-lock.yaml            # pnpm 잠금 파일
├── tailwind.config.ts         # Tailwind CSS 설정 파일
├── tsconfig.json              # TypeScript 설정 파일
├── vitest.config.ts           # Vitest 테스트 설정 파일
├── vitest.setup.ts            # Vitest 테스트 환경 설정 파일
└── README.md                  # 프로젝트 문서
```

## 🚀 시작하기

### 1. 의존성 설치

프로젝트를 클론한 후, 다음 명령어를 사용하여 필요한 의존성을 설치합니다.

```bash
pnpm install
```

### 2. 환경 변수

**환경 변수 종류**

- `.env.local`: 로컬 개발 환경에서 사용되는 환경 변수 (`.gitignore`에 의해 추적되지 않음)
- `.env.development`: 개발 서버 빌드 시 사용되는 환경 변수 (팀 개발용)
- `.env.production`: 프로덕션 서버 빌드 시 사용되는 환경 변수 (배포용)

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하여 결과를 확인합니다.

## ⚙️ 스크립트

### 개발 관련 스크립트

- `pnpm dev`: 기본 개발 서버를 시작합니다.

### 빌드 관련 스크립트

- `pnpm build:local`: 로컬 환경 빌드를 생성합니다 (`NODE_ENV=development`).
- `pnpm build:dev`: 개발 환경 빌드를 생성합니다 (`NODE_ENV=development`).
- `pnpm build:prod`: 프로덕션 환경 빌드를 생성합니다 (`NODE_ENV=production`).
- `pnpm start`: 프로덕션 빌드를 실행합니다.

### 코드 품질 관련 스크립트

- `pnpm lint`: ESLint를 실행하여 코드 스타일을 검사합니다.
- `pnpm test`: Vitest를 사용하여 테스트를 실행합니다.
- `pnpm coverage`: Vitest를 사용하여 코드 커버리지를 측정합니다.
- `pnpm prepare`: Husky 훅을 설정합니다 (의존성 설치 시 자동으로 실행).

**환경별 빌드 사용법**

```bash
# 로컬 환경 빌드
pnpm build:local

# 개발 환경 빌드
pnpm build:dev

# 프로덕션 환경 빌드
pnpm build:prod
```

## 📝 코드 스타일 및 품질

프로젝트는 일관된 코드 품질과 스타일을 유지하기 위해 다음과 같은 도구와 규칙을 사용합니다.

- **ESLint**: 코드에서 잠재적인 오류와 스타일 문제를 식별합니다.
- **Prettier**: 코드 포맷팅을 자동으로 처리하여 일관된 코드 스타일을 유지합니다.
- **Husky & lint-staged**: 커밋 전 자동으로 ESLint 검사, Prettier 포맷팅, 테스트를 실행하여 코드 품질을 보장합니다.
- **주요 코드 스타일 규칙**:
  - `interface` 기반 타입 정의 및 `enum` 대신 객체 맵 활용.
  - 함수형 컴포넌트만 사용.
  - `named export`만 허용, `default export` 금지.
  - 상태 변수명에 `isLoading`, `hasError` 등 보조동사 접두사 사용.
  - `Zod`를 통한 API/로직 코드의 런타임 타입 검증.
  - **Barrel Export 패턴**을 이용하여 모듈 export를 관리하여 import 구문을 간결하게 유지합니다.

## 🔐 보안 및 인증

이 프로젝트는 보안을 강화하기 위해 다음과 같은 토큰 관리 전략을 사용합니다:

### 토큰 저장 전략

- **Access Token**: 브라우저 메모리(Zustand store)에만 저장
- **Refresh Token**: `HttpOnly`, `Secure`, `SameSite` 속성이 설정된 쿠키에 저장

### 보안 이점

- **XSS 공격 방지**: Access Token이 localStorage에 저장되지 않아 XSS 공격 시 토큰 유출 위험 감소
- **CSRF 공격 방지**: Refresh Token이 HttpOnly 쿠키에 저장되어 JavaScript에서 접근 불가능
- **자동 토큰 관리**: Axios 인터셉터가 자동으로 Access Token을 요청 헤더에 포함

### 사용 방법

#### 로그인 예시:

```typescript
import { loginUser } from '@/lib/auth'

// 로그인 시 두 토큰 모두 설정
const response = await loginUser({
  email: 'user@example.com',
  password: 'password',
})

// 자동으로:
// - accessToken을 메모리에 저장
// - refreshToken을 HttpOnly 쿠키에 저장
```

#### API 요청 예시:

**백엔드 API 호출 (상대경로 사용):**

```typescript
import axiosInstance from '@/lib/axios'

// baseURL이 자동으로 붙음: https://api.example.com/protected-endpoint
const response = await axiosInstance.get('/protected-endpoint')
```

**외부 API 호출 (완전한 URL 사용):**

```typescript
import axiosInstance from '@/lib/axios'

// 완전한 URL 사용 시 baseURL 무시
const response = await axiosInstance.get('https://jsonplaceholder.typicode.com/posts/1')
```

## 📡 API 통신

API 통신은 `Axios` 라이브러리를 사용하며, 토큰 기반 인증을 지원합니다.

- `src/lib/axios.ts`: 요청/응답 인터셉터가 설정된 Axios 인스턴스를 정의합니다. 모든 요청에 store의 `accessToken`을 `Bearer` 토큰으로 `Authorization` 헤더에 자동으로 포함합니다.

### BaseURL 설정

- **백엔드 API**: 상대경로 사용 시 `baseURL` 자동 적용 (예: `/users` → `https://api.example.com/users`)
- **외부 API**: 완전한 URL 사용 시 `baseURL` 무시 (예: `https://jsonplaceholder.typicode.com/posts`)
- `src/lib/auth.ts`: 로그인, 로그아웃, 토큰 갱신 등의 인증 관련 함수를 제공합니다.
- `src/store/auth-store.ts`: 사용자 정보와 `accessToken`을 메모리에 저장하고, `refreshToken`을 쿠키에서 관리합니다.

## 🧪 테스트 (TDD 기반)

프로젝트는 **TDD(Test Driven Development)** 접근법을 사용하여 개발되며, `Vitest` 프레임워크를 통해 빠르고 안정적인 테스트 환경을 제공합니다.

### 테스트 구성 요소

- **Vitest**: 현대적이고 빠른 단위 테스트 프레임워크
- **@testing-library/react**: React 컴포넌트 테스트를 위한 유틸리티
- **@testing-library/jest-dom**: 추가적인 DOM 매처 제공
- **jsdom**: 브라우저 환경 시뮬레이션
- **React Router DOM**: 라우팅 테스트 지원

### 테스트 실행 방법

```bash
# 모든 테스트 실행 (watch 모드)
pnpm test

# 커버리지 측정 및 보고서 생성
pnpm coverage

# 단일 실행 모드
pnpm test run

# 특정 테스트 파일만 실행
pnpm test src/lib/__tests__/utils.test.ts
```

### 테스트 구조

테스트는 각 모듈별로 **컬로케이션 (Colocation)** 패턴을 따르며, 구현 코드와 같은 위치에 `__tests__/` 폴더로 구성됩니다:

```
src/
├── components/__tests__/     # 컴포넌트 테스트
├── lib/__tests__/           # 유틸리티 함수 테스트
└── store/__tests__/         # Zustand 스토어 테스트
```

### 샘플 테스트 코드

#### 1. 유틸리티 함수 테스트 (`src/lib/__tests__/utils.test.ts`)

```typescript
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
})
```

#### 2. Zustand 스토어 테스트 (`src/store/__tests__/auth-store.test.ts`)

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../auth-store'

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, accessToken: null, isLoading: false })
  })

  it('초기 상태가 올바르게 설정되어야 함', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('사용자 정보를 설정해야 함', () => {
    const user = { email: 'test@example.com' }
    useAuthStore.getState().setUser(user, 'token')

    const state = useAuthStore.getState()
    expect(state.user).toEqual(user)
    expect(state.accessToken).toBe('token')
  })
})
```

#### 3. React 컴포넌트 테스트 (`src/components/__tests__/footer.test.tsx`)

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../footer'

describe('Footer 컴포넌트', () => {
  it('푸터가 렌더링되어야 함', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('프로젝트 제목이 표시되어야 함', () => {
    render(<Footer />)
    expect(screen.getByText('Next.js Boilerplate')).toBeInTheDocument()
  })

  it('링크가 올바른 href를 가져야 함', () => {
    render(<Footer />)
    const aboutLink = screen.getByText('프로젝트 소개').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })
})
```

### 테스트 작성 가이드라인

1. **TDD 접근법**: 기능 구현 전에 테스트부터 작성
2. **설명적인 테스트 이름**: 무엇을 테스트하는지 명확히 표현
3. **단일 책임**: 하나의 테스트는 하나의 동작만 검증
4. **독립성**: 테스트 간 서로 의존하지 않도록 구성
5. **실제 사용 시나리오 반영**: 실제 사용자 경험을 고려한 테스트 작성

## 🛡️ 폴백 시스템 (Fallback System)

프로젝트는 다양한 오류 상황에 대비한 포괄적인 폴백 시스템을 제공합니다.

### 🚨 에러 페이지 구성

**1. 404 Not Found 페이지 (`app/not-found.tsx`)**

- 존재하지 않는 URL 접근 시 표시
- 홈으로 돌아가기, 이전 페이지로 돌아가기 기능 제공
- 관련 페이지 링크를 통한 사용자 유도

**2. 페이지별 에러 페이지 (`app/error.tsx`)**

- 특정 페이지에서 JavaScript 에러 발생 시 표시
- "다시 시도하기" 기능으로 오류 복구 가능
- 개발 환경에서 상세 에러 정보 제공

**3. 글로벌 에러 페이지 (`app/global-error.tsx`)**

- 전체 애플리케이션에서 치명적 에러 발생 시 표시
- 완전한 HTML 문서 구조로 구성 (Next.js 요구사항)
- 에러 추적을 위한 고유 에러 ID 생성

### 🛠️ 에러 바운더리 컴포넌트

**클래스형 에러 바운더리 (`components/error-boundary.tsx`)**

```typescript
import { ErrorBoundary } from '@/components'

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**커스텀 폴백 컴포넌트 사용**

```typescript
<ErrorBoundary
  fallback={({ error, reset }) => (
    <CustomErrorComponent error={error} onRetry={reset} />
  )}
>
  <YourComponent />
</ErrorBoundary>
```

### 🖼️ 이미지 폴백 컴포넌트

**ImageWithFallback (`components/image-with-fallback.tsx`)**

```typescript
import { ImageWithFallback } from '@/components'

// 기본 사용법
<ImageWithFallback
  src="/image.jpg"
  fallbackSrc="/placeholder.svg"
  alt="설명"
/>

// 커스텀 폴백 컴포넌트 사용
<ImageWithFallback
  src="/avatar.jpg"
  fallbackComponent={<AvatarFallback name="사용자 이름" />}
  alt="아바타"
/>
```

### 🎨 주요 특징

- **사용자 친화적**: 모든 에러 페이지가 한국어로 구성되어 직관적임
- **개발자 친화적**: 개발 환경에서 상세 에러 정보 제공
- **접근성**: 키보드 네비게이션과 스크린 리더 지원
- **반응형 디자인**: 모든 디바이스에서 일관된 경험 제공
- **재사용 가능**: 컴포넌트화되어 프로젝트 전반에 활용 가능
