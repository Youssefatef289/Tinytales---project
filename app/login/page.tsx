'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { authApi, handleApiError } from '@/lib/api/auth'
import { storage } from '@/lib/utils/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { ROUTES } from '@/lib/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    // Check if user is already logged in
    const token = storage.get(STORAGE_KEYS.TOKEN)
    if (token) {
      router.push(ROUTES.DASHBOARD)
    }
  }, [router])

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await authApi.login(data)

      if (response.status && response.data.token) {
        // Store token and user name
        storage.set(STORAGE_KEYS.TOKEN, response.data.token)
        storage.set(STORAGE_KEYS.USER_NAME, response.data.name)

        // Redirect to dashboard or redirect URL
        const redirectUrl = searchParams.get('redirect') || ROUTES.DASHBOARD
        router.push(redirectUrl)
      }
    } catch (err: any) {
      setError(handleApiError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أو{' '}
            <Link
              href={ROUTES.REGISTER}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert type="error" message={error} onClose={() => setError('')} />
          )}

          <div className="space-y-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              {...register('email')}
              error={errors.email}
              placeholder="example@email.com"
            />

            <Input
              label="كلمة المرور"
              type="password"
              {...register('password')}
              error={errors.password}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  )
}

