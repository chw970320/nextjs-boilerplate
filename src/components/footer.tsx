import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next.js Boilerplate</h3>
            <p className="text-gray-600 text-sm">
              환경별 빌드 설정이 완료된 현대적인 Next.js 프로젝트 템플릿입니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 링크</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                프로젝트 소개
              </Link>
              <Link
                href="/api-test"
                className="block text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                API 테스트
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">기술 정보</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Next.js 15</p>
              <p>React 19</p>
              <p>TypeScript</p>
              <p>Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">© 2025 Next.js Boilerplate.</p>
        </div>
      </div>
    </footer>
  )
}
