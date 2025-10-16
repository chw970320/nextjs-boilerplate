import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>

          <div className="text-sm text-gray-500">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">다른 페이지 찾기</h3>
          <div className="space-y-2 text-sm">
            <Link href="/about" className="block text-blue-600 hover:text-blue-800">
              프로젝트 소개
            </Link>
            <Link href="/api-test" className="block text-blue-600 hover:text-blue-800">
              API 테스트
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
