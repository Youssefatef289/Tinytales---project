import apiClient from './client'
import { RegisterRequest, LoginRequest, VerifyRequest, AuthResponse, ApiError } from '@/lib/types/auth'

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('mobile', data.mobile)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.password_confirmation)
    formData.append('mobile_country_code', data.mobile_country_code)

    const response = await apiClient.post<AuthResponse>('/auth/register', formData)
    return response.data
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await apiClient.post<AuthResponse>('/auth/login', formData)
    return response.data
  },

  verify: async (data: VerifyRequest): Promise<AuthResponse> => {
    const formData = new FormData()
    formData.append('code', data.code)

    const response = await apiClient.post<AuthResponse>('/auth/verify-email', formData)
    return response.data
  },

  getUserData: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>('/auth/user-data')
    return response.data
  },

  resendCode: async (): Promise<{ status: boolean; message: string }> => {
    const formData = new FormData()
    const response = await apiClient.post<{ status: boolean; message: string }>(
      '/auth/verify-email/resend-code',
      formData
    )
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },
}

export const handleApiError = (error: any): string => {
  // Log error for debugging
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message,
  })

  // Handle validation errors
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors
    const errorMessages: string[] = []
    
    Object.entries(errors).forEach(([field, messages]) => {
      if (Array.isArray(messages) && messages.length > 0) {
        errorMessages.push(messages[0] as string)
      }
    })
    
    if (errorMessages.length > 0) {
      return errorMessages.join('. ')
    }
  }

  // Handle general error message
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  // Handle network errors
  if (error.message === 'Network Error' || !error.response) {
    return 'خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.'
  }

  // Default error message
  return error.message || 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'
}

