'use client'

import React from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  register?: UseFormRegisterReturn
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, register, className = '', ...props }, ref) => {
    // If register is provided, it already includes ref, so we use it
    // Otherwise, we use the forwarded ref
    const inputRef = register?.ref || ref

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          {...register}
          {...props}
          ref={inputRef}
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

