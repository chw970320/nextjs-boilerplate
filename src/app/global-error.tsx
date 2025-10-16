'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-lg w-full text-center">
            <div className="mb-8">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                서비스에 문제가 발생했습니다
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                현재 서비스에 일시적인 문제가 발생하여 페이지를 표시할 수 없습니다. 잠시 후 다시
                시도해주세요.
              </p>

              {/* 개발 환경에서만 상세 에러 정보 표시 */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mb-8 text-left bg-red-50 border border-red-200 p-6 rounded-lg">
                  <summary className="cursor-pointer font-semibold text-red-800 mb-3">
                    🚨 개발자용 상세 에러 정보
                  </summary>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-red-700">에러 메시지:</h4>
                      <pre className="text-sm text-red-600 bg-white p-3 rounded border mt-1">
                        {error.message}
                      </pre>
                    </div>
                    {error.stack && (
                      <div>
                        <h4 className="font-medium text-red-700">스택 트레이스:</h4>
                        <pre className="text-xs text-red-500 bg-white p-3 rounded border mt-1 max-h-40 overflow-auto">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                    {error.digest && (
                      <div>
                        <h4 className="font-medium text-red-700">에러 ID:</h4>
                        <code className="text-sm bg-white px-2 py-1 rounded border">
                          {error.digest}
                        </code>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                🔄 페이지를 다시 로드하기
              </button>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg"
              >
                🏠 홈페이지로 돌아가기
              </Link>
            </div>

            {/* 시스템 상태 정보 */}
            <div className="mt-16 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">💡 도움이 필요하신가요?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 이 문제가 지속되면 관리자에게 문의해주세요</p>
                <p>• 브라우저를 새로고침해보세요</p>
                <p>• 잠시 후 다시 시도해주세요</p>
                <p>• 다른 네트워크 환경에서 접속해보세요</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  오류 발생 시간: {new Date().toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
