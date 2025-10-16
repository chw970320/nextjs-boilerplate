// src/features/user/useUserProfile.ts
import { useQuery } from '@tanstack/react-query'
import { fetchUserProfile } from '@/lib/api'

export function useUserProfile(email: string) {
  return useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUserProfile(email),
    staleTime: 60 * 1000,
    retry: 2,
  })
}
