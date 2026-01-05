'use client'

import { useState } from 'react'
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
import Link from 'next/link'

const registerSchema = z
  .object({
    name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    mobile: z.string().min(8, 'رقم الهاتف غير صحيح'),
    password: z.string().min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف'),
    password_confirmation: z.string(),
    mobile_country_code: z.string().min(1, 'كود الدولة مطلوب'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'كلمات المرور غير متطابقة',
    path: ['password_confirmation'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      mobile_country_code: '971',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError('')
    setIsLoading(true)

    try {
      console.log('Submitting registration data:', {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        mobile_country_code: data.mobile_country_code,
        password: '***',
      })

      const response = await authApi.register(data)
      
      console.log('Registration response:', response)

      if (response.status && response.data?.token) {
        // Store token temporarily for verification
        storage.set(STORAGE_KEYS.TOKEN, response.data.token)
        router.push(ROUTES.VERIFY)
      } else {
        setError('فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.')
      }
    } catch (err: any) {
      console.error('Registration error:', err)
      const errorMessage = handleApiError(err)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أو{' '}
            <Link
              href={ROUTES.LOGIN}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              تسجيل الدخول إلى حسابك
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert type="error" message={error} onClose={() => setError('')} />
          )}

          <div className="space-y-4">
            <Input
              label="الاسم بالكامل"
              type="text"
              {...register('name')}
              error={errors.name}
              placeholder="أدخل اسمك الكامل"
            />

            <Input
              label="البريد الإلكتروني"
              type="email"
              {...register('email')}
              error={errors.email}
              placeholder="example@email.com"
            />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Input
                  label="كود الدولة"
                  type="text"
                  {...register('mobile_country_code')}
                  error={errors.mobile_country_code}
                  placeholder="971"
                />
              </div>
              <div className="col-span-2">
                <Input
                  label="رقم الهاتف"
                  type="tel"
                  {...register('mobile')}
                  error={errors.mobile}
                  placeholder="0501234567"
                />
              </div>
            </div>

            <Input
              label="كلمة المرور"
              type="password"
              {...register('password')}
              error={errors.password}
              placeholder="••••••••"
            />

            <Input
              label="تأكيد كلمة المرور"
              type="password"
              {...register('password_confirmation')}
              error={errors.password_confirmation}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            إنشاء الحساب
          </Button>
        </form>
      </div>
    </div>
  )
}

