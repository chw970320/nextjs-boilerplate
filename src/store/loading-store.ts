// src/store/loading-store.ts
import { create } from 'zustand'

interface LoadingState {
  // 전체 로딩 상태 (다중 요청 시)
  isLoading: boolean

  // 특정 작업별 로딩 상태 (키-값 형태로 관리)
  loadingTasks: Record<string, boolean>

  // 로딩 시작
  startLoading: (task?: string) => void

  // 로딩 종료
  stopLoading: (task?: string) => void

  // 특정 작업의 로딩 상태 확인
  isTaskLoading: (task: string) => boolean

  // 모든 로딩 종료
  stopAllLoading: () => void
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: false,
  loadingTasks: {},

  startLoading: (task) => {
    if (task) {
      set((state) => ({
        loadingTasks: {
          ...state.loadingTasks,
          [task]: true,
        },
      }))
    } else {
      set({ isLoading: true })
    }
  },

  stopLoading: (task) => {
    if (task) {
      set((state) => ({
        loadingTasks: {
          ...state.loadingTasks,
          [task]: false,
        },
      }))
    } else {
      set({ isLoading: false })
    }
  },

  isTaskLoading: (task: string) => {
    return get().loadingTasks[task] || false
  },

  stopAllLoading: () => {
    set({
      isLoading: false,
      loadingTasks: {},
    })
  },
}))
