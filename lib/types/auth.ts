export interface RegisterRequest {
  name: string
  email: string
  mobile: string
  password: string
  password_confirmation: string
  mobile_country_code: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface VerifyRequest {
  code: string
}

export interface AuthResponse {
  status: boolean
  status_code: number
  data: {
    id: number
    type: string
    name: string
    email: string
    mobile_country_code: string
    mobile: string
    image: string
    email_verified_at: boolean | null
    token: string
    is_complete: boolean
    is_approved: boolean
    status_docs: string
    documents: any
  }
  message: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

