'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { authApi, handleApiError } from '@/lib/api/auth'
import { storage } from '@/lib/utils/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { ROUTES } from '@/lib/constants'
import Header from '@/components/layout/Header'

// Mock product data
const productData = {
  id: 1,
  name: "J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With Blue",
  category: "T-Shirt",
  price: 300,
  originalPrice: 360,
  description: "Lorem ipsum dolor sit, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, diam nonummy",
  images: [
    '/image/producat (1).png',
    '/image/producat (2).png',
    '/image/producat (3).png',
    '/image/producat (4).png',
    '/image/producat (5).png',
  ],
  types: ['Cotton', 'Polyester', 'Blend'],
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  colors: [
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Gold', value: '#F59E0B' },
    { name: 'Light Blue', value: '#60A5FA' },
    { name: 'Gray', value: '#6B7280' },
  ],
  rating: 4.5,
  totalReviews: 3000,
  ratingBreakdown: {
    5: 67,
    4: 15,
    3: 6,
    2: 3,
    1: 9,
  },
  reviews: [
    {
      id: 1,
      name: 'Alex Daewn',
      rating: 4.5,
      date: '4 months ago',
      comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
    },
    {
      id: 2,
      name: 'Alex Doown',
      rating: 4,
      date: '4 months ago',
      comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
    },
    {
      id: 3,
      name: 'Alex Daewn',
      rating: 5,
      date: '4 months ago',
      comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
    },
    {
      id: 4,
      name: 'Alex Doown',
      rating: 3.5,
      date: '4 months ago',
      comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
    },
  ],
  similarItems: [
    {
      id: 1,
      name: "JVER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free With Yellow",
      price: 900,
      originalPrice: 1200,
      image: '/image/producat (1).png',
      rating: 4.5,
      reviews: 200,
      discount: 25,
      brand: 'Graves',
      colors: ['black', 'brown', 'pink'],
    },
    {
      id: 2,
      name: "JVER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free",
      price: 699,
      originalPrice: 900,
      image: '/image/producat (2).png',
      rating: 4.0,
      reviews: 150,
      brand: 'Graves',
      colors: ['white', 'black'],
    },
    {
      id: 3,
      name: "JVER Women's Dress Shirts Solid Long Sleeve",
      price: 900,
      image: '/image/producat (3).png',
      rating: 4.5,
      reviews: 180,
      brand: 'Graves',
      colors: ['brown', 'black', 'pink'],
    },
    {
      id: 4,
      name: "JVER Women's Dress Shirts",
      price: 900,
      image: '/image/producat (4).png',
      rating: 4.2,
      reviews: 120,
      brand: 'Graves',
      colors: ['gray', 'black'],
    },
    {
      id: 5,
      name: "JVER Women's Dress Shirts Solid",
      price: 900,
      image: '/image/producat (5).png',
      rating: 4.5,
      reviews: 250,
      brand: 'Graves',
      colors: ['black', 'brown'],
    },
  ],
}

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedType, setSelectedType] = useState(productData.types[0])
  const [selectedSize, setSelectedSize] = useState(productData.sizes[5]) // 3XL
  const [selectedColor, setSelectedColor] = useState(productData.colors[1]) // Blue
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const checkAuth = async () => {
      const token = storage.get(STORAGE_KEYS.TOKEN)
      const storedUserName = storage.get(STORAGE_KEYS.USER_NAME)

      if (!token) {
        router.push(ROUTES.LOGIN)
        return
      }

      if (storedUserName) {
        setUserName(storedUserName)
        setIsLoading(false)
      } else {
        try {
          const response = await authApi.getUserData()
          if (response.status && response.data.name) {
            setUserName(response.data.name)
            storage.set(STORAGE_KEYS.USER_NAME, response.data.name)
          }
        } catch (err: any) {
          setError(handleApiError(err))
          if (err.response?.status === 401) {
            router.push(ROUTES.LOGIN)
          }
        } finally {
          setIsLoading(false)
        }
      }
    }

    checkAuth()
  }, [router])

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const totalPrice = productData.price * quantity

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Breadcrumbs */}
      <div className="relative bg-gray-50 border-b overflow-hidden min-h-[200px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/image/header.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>

        {/* Wavy Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" fill="rgba(0,0,0,0.05)" />
            <path d="M0,100 Q300,150 600,100 T1200,100 L1200,0 L0,0 Z" fill="rgba(0,0,0,0.05)" />
          </svg>
        </div>
        
        {/* Large Background Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-black  select-none">Product Details</h1>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="relative container mx-auto px-4 py-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm px-6 py-4 inline-block border border-gray-100">
            <nav className="text-sm text-gray-600 flex items-center">
              <span className="hover:text-amber-600 cursor-pointer transition-colors font-medium">Home</span>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="hover:text-amber-600 cursor-pointer transition-colors font-medium">Our Category</span>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-900 font-semibold">Product Details</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative bg-white rounded-lg p-4">
              <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  fill
                  className="object-cover"
                  priority={selectedImage === 0}
                />
                <button
                  onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : productData.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev < productData.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3">
                {productData.images.slice(0, 3).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                      selectedImage === index ? 'border-gray-800 shadow-md' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                    {index === 2 && productData.images.length > 3 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                        +{productData.images.length - 3}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-white rounded-lg p-8">
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-md mb-4 font-medium">
              {productData.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{productData.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-gray-900">${productData.price.toFixed(2)}</span>
                <span className="text-2xl text-gray-400 line-through">${productData.originalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500">This price is exclusive of taxes.</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">{productData.description}</p>

            {/* Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {productData.types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {productData.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Colors</label>
              <div className="flex gap-4 mb-2">
                {productData.colors.map((color) => (
                  <div key={color.name} className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedColor(color)}
                      className={`w-14 h-14 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-blue-400 shadow-lg scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor.name === color.name && (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-7 h-7 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                    {selectedColor.name === color.name && (
                      <span className="text-xs text-gray-600 mt-1 font-medium">{color.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-end gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">
                  Quantity (${productData.price.toFixed(2)} for Piece)
                </label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-5 py-3 hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                  >
                    -
                  </button>
                  <span className="px-8 py-3 border-x-2 border-gray-300 font-semibold text-gray-900 bg-gray-50">
                    {quantity.toString().padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-5 py-3 hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-2">${totalPrice.toFixed(2)}</p>
              </div>
              <button className="flex-1 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Rating & Reviews Section */}
        <div className="bg-white rounded-lg p-10 mb-16 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Rating & Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
            <div>
              <div className="text-6xl font-bold text-gray-900 mb-2">{productData.rating} /5</div>
            </div>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-12">{star} star</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${productData.ratingBreakdown[star as keyof typeof productData.ratingBreakdown]}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {productData.ratingBreakdown[star as keyof typeof productData.ratingBreakdown]}%
                  </span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-gray-900 mb-2">{productData.totalReviews / 1000}K</div>
              <p className="text-gray-600 mb-4">Total Reviews</p>
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                Add Comment
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-8 border-t border-gray-200 pt-8">
            {productData.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-1">{review.name}</h4>
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(review.rating)
                                ? 'text-yellow-400'
                                : i < review.rating
                                ? 'text-yellow-400 opacity-50'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <button className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium">
              View More Comments
            </button>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Items</h2>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {productData.similarItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all group"
                >
                    <div className="relative">
                     <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                       <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100">
                         <Image src="/image/icons/icon.svg" alt="More" width={19} height={17} className="w-5 h-5" />
                       </button>
                       <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100">
                         <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                         </svg>
                       </button>
                     </div>
                     {item.discount && (
                       <div className="absolute top-3 left-3 z-10 bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-lg">
                         {item.discount}% OFF
                       </div>
                     )}
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{item.rating} ({item.reviews})</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">{item.brand}</p>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2 min-h-[2.5rem]">{item.name}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">AED {item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">AED {item.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-7 h-7 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{
                            backgroundColor:
                              color === 'black'
                                ? '#000000'
                                : color === 'brown'
                                ? '#8B4513'
                                : color === 'pink'
                                ? '#FFC0CB'
                                : color === 'white'
                                ? '#FFFFFF'
                                : '#6B7280',
                          }}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <span className="text-xs text-gray-500 font-medium flex items-center">+{item.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-all shadow-lg z-10">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-all shadow-lg z-10">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer with Background Image */}
      <footer className="relative bg-amber-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/image/footer.jpg')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-16 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="mb-6">
                <Image src="/image/TT LogoTT Logo 1.svg" alt="TinyTales" width={66} height={51} className="h-14 w-auto filter brightness-0 invert" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Let Us Help</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Policies</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Send Email</h4>
              <div className="flex gap-2 mb-6">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-amber-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 border border-amber-700"
                />
                <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl">
                  Send
                </button>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.042-.024-3.989 1.044a.824.824 0 01-1.015-.622l-.006-.022a.823.823 0 01.621-1.015l3.99-1.044.021-.006a9.876 9.876 0 01-1.378-5.032c0-5.45 4.436-9.886 9.887-9.886 5.45 0 9.886 4.436 9.886 9.886 0 5.45-4.436 9.886-9.886 9.886m0-18.884C6.904 2.899 2.899 6.904 2.899 11.978c0 1.458.324 2.838.9 4.082l-.59 1.85a.824.824 0 00.622 1.015l.022.006a.824.824 0 001.015-.622l.59-1.85a9.06 9.06 0 004.082.9c5.074 0 9.079-4.005 9.079-9.079 0-5.074-4.005-9.079-9.079-9.079" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.208 2.324-1.186 4.05-2.936 5.177-.87.56-1.89.94-3.06 1.13-.87.13-1.8.15-2.79.07-1.08-.09-2.08-.3-3.01-.63-.28-.1-.54-.22-.78-.35-.24-.13-.45-.27-.63-.42-.18-.15-.32-.31-.42-.48-.1-.17-.15-.35-.15-.54 0-.19.05-.37.15-.54.1-.17.24-.33.42-.48.18-.15.39-.29.63-.42.24-.13.5-.25.78-.35.93-.33 1.93-.54 3.01-.63.99-.08 1.92-.06 2.79.07 1.17.19 2.19.57 3.06 1.13 1.75 1.13 2.73 2.85 2.94 5.18.02.19.03.38.03.57 0 .19-.01.38-.03.57z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
