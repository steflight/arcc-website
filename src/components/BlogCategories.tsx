'use client'

import { useState } from 'react'

interface BlogCategoriesProps {
  categories: string[]
  onCategorySelect?: (category: string | null) => void
}

export default function BlogCategories({ categories, onCategorySelect }: BlogCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategorySelect = (category: string) => {
    const newSelection = selectedCategory === category ? null : category
    setSelectedCategory(newSelection)
    onCategorySelect?.(newSelection)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
