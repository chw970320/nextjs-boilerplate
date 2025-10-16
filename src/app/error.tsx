'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러를 콘솔에 로깅
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">문제가 발생했습니다</h1>
          <p className="text-gray-600 mb-6">
            예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 홈페이지로 돌아가세요.
          </p>

          {/* 개발 환경에서만 에러 메시지 표시 */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left bg-gray-100 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                개발자용 에러 정보
              </summary>
              <pre className="text-xs text-red-600 whitespace-pre-wrap break-all">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            다시 시도하기
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>

        {/* 도움말 */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">문제가 지속되면</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• 페이지를 새로고침해보세요</p>
            <p>• 브라우저 캐시를 삭제하고 다시 시도해보세요</p>
            <p>• 다른 브라우저에서 접속해보세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}
