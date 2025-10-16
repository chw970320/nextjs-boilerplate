'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Loading from '@/components/loading'
import axiosInstance from '@/lib/axios'

interface ApiResponse {
  url: string
  method: string
  data?: unknown
  error?: string
}

export default function ApiTestPage() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [requestBody, setRequestBody] = useState('')
  const [response, setResponse] = useState<ApiResponse | null>(null)

  const testApi = async () => {
    if (!url.trim()) {
      setResponse({
        url: '',
        method: '',
        error: 'API 주소를 입력해주세요.',
      })
      return
    }

    setResponse({ url, method })

    try {
      const config: { method: string; url: string; data?: unknown } = {
        method: method.toLowerCase(),
        url: url.trim(),
      }

      // 요청 바디가 있는 경우 추가
      if (method !== 'GET' && requestBody.trim()) {
        try {
          config.data = JSON.parse(requestBody)
        } catch {
          setResponse({
            url,
            method,
            error: '요청 바디가 유효한 JSON 형식이 아닙니다.',
          })
          return
        }
      }

      const result = await axiosInstance(config)

      setResponse({
        url,
        method,
        data: result.data,
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'API 호출 중 오류가 발생했습니다.'

      setResponse({
        url,
        method,
        error: errorMessage,
      })
    }
  }

  const formatResponse = (data: unknown) => {
    if (typeof data === 'string') return data
    return JSON.stringify(data, null, 2)
  }

  const clearResponse = () => {
    setResponse(null)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">API 테스트 페이지</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 요청 설정 영역 */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">API 요청 설정</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API 주소</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="백엔드 API: /users | 외부 API: https://api.example.com/data"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HTTP 메서드
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>

                {method !== 'GET' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      요청 바디 (JSON)
                    </label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder='{"name": "테스트", "email": "test@example.com"}'
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={testApi}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                API 호출
              </button>

              <button
                onClick={clearResponse}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                초기화
              </button>
            </div>

            {/* 미리 정의된 API 테스트 버튼들 */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">빠른 테스트</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setUrl('https://jsonplaceholder.typicode.com/posts/1') // 외부 API 호출 예시 (완전한 URL)
                    setMethod('GET')
                    setRequestBody('')
                  }}
                  className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm hover:bg-green-200 transition-colors"
                >
                  GET 요청 테스트
                </button>
                <button
                  onClick={() => {
                    setUrl('https://jsonplaceholder.typicode.com/posts') // 외부 API 호출 예시 (완전한 URL)
                    setMethod('POST')
                    setRequestBody('{"title": "테스트 제목", "body": "테스트 내용", "userId": 1}')
                  }}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm hover:bg-blue-200 transition-colors"
                >
                  POST 요청 테스트
                </button>
              </div>
            </div>
          </div>

          {/* 응답 결과 영역 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">응답 결과</h2>

            <div className="bg-gray-50 border rounded-lg p-4 min-h-[400px]">
              {response ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        response.method === 'GET'
                          ? 'bg-green-100 text-green-800'
                          : response.method === 'POST'
                            ? 'bg-blue-100 text-blue-800'
                            : response.method === 'PUT'
                              ? 'bg-yellow-100 text-yellow-800'
                              : response.method === 'DELETE'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {response.method}
                    </span>
                    <span className="text-gray-600 truncate">{response.url}</span>
                  </div>

                  <Loading task={`${method}_${url}`} text="요청 처리 중..." />
                  {response.error ? (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <p className="text-red-800 text-sm">
                        <strong>오류:</strong> {response.error}
                      </p>
                    </div>
                  ) : response.data ? (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">응답 데이터:</h4>
                      <pre className="bg-white border rounded p-3 text-xs overflow-auto max-h-96 text-gray-700">
                        {formatResponse(response.data)}
                      </pre>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  API를 호출하면 결과가 여기에 표시됩니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
