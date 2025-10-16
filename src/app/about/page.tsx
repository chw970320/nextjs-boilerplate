import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto pt-8 px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Next.js 보일러플레이트 소개</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            이 프로젝트는 Next.js를 기반으로 한 현대적인 웹 애플리케이션 보일러플레이트입니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">주요 특징</h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>
              <strong>Next.js App Router:</strong> 최신 App Router 아키텍처를 사용합니다.
            </li>
            <li>
              <strong>TypeScript:</strong> 타입 안전성을 보장합니다.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> 유틸리티 우선 스타일링 프레임워크입니다.
            </li>
            <li>
              <strong>환경별 설정:</strong> 개발, 스테이징, 프로덕션 환경을 구분합니다.
            </li>
            <li>
              <strong>API 통신:</strong> Axios를 통한 효율적인 API 클라이언트입니다.
            </li>
            <li>
              <strong>상태 관리:</strong> Zustand를 통한 클라이언트 상태 관리입니다.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">기술 스택</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">프론트엔드</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Next.js 15</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">개발 도구</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• ESLint</li>
                <li>• Prettier</li>
                <li>• Vitest</li>
                <li>• pnpm</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">🚀 API 테스트 페이지</h3>
            <p className="text-blue-800 mb-3">
              다양한 API 엔드포인트를 테스트하고 결과를 확인할 수 있는 페이지를 제공합니다.
            </p>
            <Link
              href="/api-test"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              API 테스트 페이지로 이동 →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
