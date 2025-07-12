'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const CampusMapComponent = dynamic(() => import('../../../components/map/CampusMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
})

export default function FullMapPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-screen w-full">
      {/* Full Screen Map Only */}
      <CampusMapComponent 
        searchQuery={searchQuery}
      />
    </div>
  )
}
