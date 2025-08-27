import React from 'react'
import CategoryCard from '../../../components/ui/CategoryCard'

function Category() {
  return (
    <div className="pb-4 lg:block ">
    <h4 className="text-gray-800 font-semibold font-fredoka text-4xl py-6 text-center">
      Shop by Category
    </h4>
    <div className="flex overflow-x-auto bg-base-200  gap-4 scrollbar-hide">
      {topFive?.map((category, index) => (
        <div key={index} className="min-w-[200px] flex-1 shrink-0">
          <CategoryCard
            image={category.image}
            name={category.name}
            productCount={category.productCount}
          />
        </div>
      ))}
    </div>
  </div>
  )
}

export default Category