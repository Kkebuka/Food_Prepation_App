import React from 'react'
import CategoryCard from '../../../components/ui/CategoryCard'
import { useQuery } from '@tanstack/react-query'

    function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      if (!res.ok) throw new Error('Failed to fetch categories')
      const json = await res.json()
      return json?.categories ?? []
    }
  })

  const categories = (data || []).slice(0, 8)

  return (
    <div className="pb-4 lg:block ">
      <h4 className="text-gray-800 font-bold font-fredoka text-3xl lg:text-4xl pt-8 text-center">
        View by Category
      </h4>
      <div className="flex overflow-x-auto bg-base-200 gap-4 scrollbar-hide p-4 rounded-xl">
        {isLoading && (
          <div className="flex w-full items-center justify-center py-8 text-sm text-gray-500">Loading...</div>
        )}
        {!isLoading && categories.map((category) => (
          <div key={category.idCategory} className="min-w-[200px] flex-1 shrink-0">
            <CategoryCard
              image={category.strCategoryThumb}
              name={category.strCategory}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories