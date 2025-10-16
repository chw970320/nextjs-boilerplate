'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string
  fallbackComponent?: React.ReactNode
  showFallbackOnError?: boolean
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/static/images/placeholder.svg',
  fallbackComponent,
  alt,
  className,
  showFallbackOnError = true,
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (showFallbackOnError && !hasError) {
      setHasError(true)
      setImageSrc(fallbackSrc)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // 커스텀 폴백 컴포넌트가 있으면 그것을 사용
  if (hasError && fallbackComponent) {
    return <>{fallbackComponent}</>
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />

      {/* 로딩 중 스피너 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

// 기본 폴백 이미지 컴포넌트
export function DefaultImageFallback({
  width = 200,
  height = 200,
  className = '',
}: {
  width?: number
  height?: number
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm text-gray-500">이미지를 불러올 수 없습니다</p>
      </div>
    </div>
  )
}

// 아바타 이미지용 폴백 컴포넌트
export function AvatarFallback({
  name,
  size = 40,
  className = '',
}: {
  name?: string
  size?: number
  className?: string
}) {
  const initials =
    name
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??'

  return (
    <div
      className={`flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}
