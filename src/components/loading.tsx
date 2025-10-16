import { useLoadingStore } from '@/store'

interface LoadingProps {
  task?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
  overlay?: boolean
  className?: string
}

export default function Loading({
  task,
  size = 'md',
  text,
  overlay = false,
  className = '',
}: LoadingProps) {
  const { isLoading, isTaskLoading } = useLoadingStore()

  const showLoading = task ? isTaskLoading(task) : isLoading

  if (!showLoading) return null

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const loadingContent = (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-blue-600`}
        />
        {text && <span className="text-sm text-gray-600 animate-pulse">{text}</span>}
      </div>
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">{loadingContent}</div>
      </div>
    )
  }

  return loadingContent
}

// 특정 작업의 로딩 상태만 확인하는 컴포넌트
export function TaskLoading({
  task,
  children,
  fallback,
}: {
  task: string
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const { isTaskLoading } = useLoadingStore()
  const loading = isTaskLoading(task)

  if (loading && fallback) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
