'use client'

import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-16">Next.js 보일러플레이트</h1>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/about"
              className="bg-white text-gray-800 px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              📖 프로젝트 소개
            </Link>
            <Link
              href="/api-test"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔗 API 테스트
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
