'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/utils/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { ROUTES } from '@/lib/constants'

export const useAuth = (redirectToLogin = true) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = storage.get(STORAGE_KEYS.TOKEN)
    
    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      if (redirectToLogin) {
        router.push(ROUTES.LOGIN)
      }
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router, redirectToLogin])

  return {
    isAuthenticated,
    isLoading,
  }
}

