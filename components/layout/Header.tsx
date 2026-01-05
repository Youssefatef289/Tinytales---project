'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { storage } from '@/lib/utils/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { ROUTES } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const router = useRouter()
  const userName = storage.get(STORAGE_KEYS.USER_NAME)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = () => {
    storage.remove(STORAGE_KEYS.TOKEN)
    storage.remove(STORAGE_KEYS.USER_NAME)
    router.push(ROUTES.LOGIN)
    setShowUserMenu(false)
  }

  return (
    <header className="relative bg-white shadow-md sticky top-0 z-50">
      {/* Header Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/image/header.jpg"
          alt="Header Background"
          fill
          className="object-cover opacity-5"
          priority
        />
      </div>

      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 z-10">
            <Image
              src="/image/TT LogoTT Logo 1.svg"
              alt="TinyTales Logo"
              width={66}
              height={51}
              className="h-12 w-auto"
              priority
            />
            <span className="text-2xl font-bold text-amber-700 hidden sm:block"></span>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-6 z-10">
            <Link href={ROUTES.DASHBOARD} className="text-gray-700 hover:text-amber-600 transition flex items-center gap-2 text-sm font-medium group">
              <Image src="/image/icons/Vector.svg" alt="Home" width={19} height={17} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Home</span>
            </Link>
            <Link href="#" className="text-gray-700 hover:text-amber-600 transition flex items-center gap-2 text-sm font-medium group">
              <Image src="/image/icons/Vector 2520.svg" alt="Category" width={5} height={2} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Our Category</span>
            </Link>
            <Link href="#" className="text-gray-700 hover:text-amber-600 transition flex items-center gap-2 text-sm font-medium group">
              <Image src="/image/icons/icon-nav- about.svg" alt="About" width={19} height={19} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>About Us</span>
            </Link>
            <Link href="#" className="text-gray-700 hover:text-amber-600 transition flex items-center gap-2 text-sm font-medium group">
              <Image src="/image/icons/contact-nav.svg" alt="Contact" width={19} height={17} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Contact Us</span>
            </Link>
            <Link href="#" className="text-gray-700 hover:text-amber-600 transition flex items-center gap-2 text-sm font-medium group">
              <Image src="/image/icons/icon.svg" alt="FAQs" width={19} height={17} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>FAQs</span>
            </Link>
          </nav>

          {/* Utility Icons - Right Side */}
          <div className="flex items-center gap-3 z-10">
            {/* Shopping Cart */}
            <button className="p-2 text-gray-700 hover:text-amber-600 transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-700 hover:text-amber-600 transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>

            {/* Wishlist */}
            <button className="p-2 text-gray-700 hover:text-red-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Language Selector */}
            <div className="hidden sm:flex items-center">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer">
                <option>EN</option>
                <option>AR</option>
              </select>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userName?.[0]?.toUpperCase() || 'U'}
                </div>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{userName || 'User'}</p>
                    <p className="text-xs text-gray-500">user@example.com</p>
                  </div>
                  <Link
                    href={ROUTES.DASHBOARD}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-2 z-10 relative">
            <Link
              href={ROUTES.DASHBOARD}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setShowMobileMenu(false)}
            >
              <Image src="/image/icons/Vector.svg" alt="Home" width={19} height={17} className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setShowMobileMenu(false)}
            >
              <Image src="/image/icons/Vector 2520.svg" alt="Category" width={5} height={2} className="w-4 h-4" />
              <span>Our Category</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setShowMobileMenu(false)}
            >
              <Image src="/image/icons/icon-nav- about.svg" alt="About" width={19} height={19} className="w-4 h-4" />
              <span>About Us</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setShowMobileMenu(false)}
            >
              <Image src="/image/icons/contact-nav.svg" alt="Contact" width={19} height={17} className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setShowMobileMenu(false)}
            >
              <Image src="/image/icons/icon.svg" alt="FAQs" width={19} height={17} className="w-4 h-4" />
              <span>FAQs</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
