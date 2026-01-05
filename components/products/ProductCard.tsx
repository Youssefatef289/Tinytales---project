'use client'

import Image from 'next/image'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  discount?: number
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  rating = 4.5,
  reviews = 200,
  discount,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 flex flex-col space-y-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        {discount && (
          <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            {discount}% OFF
          </div>
        )}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 mr-2">
            {rating} ({reviews})
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2">Graves</p>
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            {originalPrice && (
              <span className="text-gray-400 line-through text-sm">AED {originalPrice}</span>
            )}
            <span className="text-lg font-bold text-gray-900">AED {price}</span>
          </div>
          <div className="flex space-x-1 space-x-reverse">
            <div className="w-4 h-4 rounded-full bg-black border-2 border-white"></div>
            <div className="w-4 h-4 rounded-full bg-brown-500 border-2 border-white"></div>
            <div className="w-4 h-4 rounded-full bg-pink-500 border-2 border-white"></div>
            <span className="text-xs text-gray-500">+2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

