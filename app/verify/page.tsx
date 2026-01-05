'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { authApi, handleApiError } from '@/lib/api/auth'
import { storage } from '@/lib/utils/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { ROUTES } from '@/lib/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

const verifySchema = z.object({
  code: z.string().min(6, 'كود التفعيل يجب أن يكون 6 أرقام').max(6, 'كود التفعيل يجب أن يكون 6 أرقام'),
})

type VerifyFormData = z.infer<typeof verifySchema>

export default function VerifyPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  })

  useEffect(() => {
    // Check if user has token (from registration)
    const token = storage.get(STORAGE_KEYS.TOKEN)
    if (!token) {
      router.push(ROUTES.REGISTER)
    }
  }, [router])

  const onSubmit = async (data: VerifyFormData) => {
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await authApi.verify({ code: data.code })

      if (response.status) {
        setSuccess('تم تفعيل الحساب بنجاح! سيتم تحويلك إلى صفحة تسجيل الدخول...')
        
        // Clear token and redirect to login
        setTimeout(() => {
          storage.remove(STORAGE_KEYS.TOKEN)
          router.push(ROUTES.LOGIN)
        }, 2000)
      }
    } catch (err: any) {
      setError(handleApiError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError('')
    setSuccess('')
    setIsResending(true)

    try {
      const response = await authApi.resendCode()
      if (response.status) {
        setSuccess('تم إرسال كود التفعيل مرة أخرى إلى بريدك الإلكتروني')
      }
    } catch (err: any) {
      setError(handleApiError(err))
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تفعيل الحساب
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل كود التفعيل الذي تم إرساله إلى بريدك الإلكتروني
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert type="error" message={error} onClose={() => setError('')} />
          )}

          {success && (
            <Alert type="success" message={success} onClose={() => setSuccess('')} />
          )}

          <div className="space-y-4">
            <Input
              label="كود التفعيل"
              type="text"
              {...register('code')}
              error={errors.code}
              placeholder="123456"
              maxLength={6}
            />

            <p className="text-xs text-gray-500 text-center">
              كود التفعيل للاختبار: <span className="font-mono font-bold">123456</span>
            </p>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            تفعيل الحساب
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
            >
              {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الكود'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

