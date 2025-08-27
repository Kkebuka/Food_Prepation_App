import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useFavorites } from '../../contexts/FavoritesContext.jsx'

function CategoryProduct() {
  const { name } = useParams();
  const categoryName = decodeURIComponent(name || '');

  const [sortOrder, setSortOrder] = useState('A-Z');
  const [startsWith, setStartsWith] = useState('');

  const { data: mealsData, isLoading, isError } = useQuery({
    queryKey: ['categoryMeals', categoryName],
    queryFn: async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`)
      if (!res.ok) throw new Error('Failed to fetch meals');
      const json = await res.json();
      return json?.meals ?? [];
    },
    enabled: Boolean(categoryName),
  });

  const meals = useMemo(() => {
    let list = (mealsData || []).map((m) => ({ id: m.idMeal, name: m.strMeal, image: m.strMealThumb }));
    if (startsWith) {
      list = list.filter((m) => m.name.toLowerCase().startsWith(startsWith.toLowerCase()))
    }
    list.sort((a, b) => sortOrder === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
    return list;
  }, [mealsData, sortOrder, startsWith]);

  const { toggleFavorite } = useFavorites();

  return (
    <main className="py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">{categoryName || 'Category'}</h1>
            <p className="mt-1 text-sm text-gray-600">Browse meals in this category.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200/70"
            >
              <option value="A-Z">Sort: A–Z</option>
              <option value="Z-A">Sort: Z–A</option>
            </select>
            <input
              value={startsWith}
              onChange={(e) => setStartsWith(e.target.value)}
              placeholder="Starts with..."
              className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-200/70"
            />
          </div>
        </div>

        {isLoading && (
          <div className="py-10 text-center text-sm text-gray-500">Loading meals...</div>
        )}
        {isError && (
          <div className="py-10 text-center text-sm text-red-600">Failed to load meals.</div>
        )}

        {!isLoading && !isError && (
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {meals.map((meal) => (
              <article key={meal.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
                  <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">{meal.name}</h3>
                  <div className="flex items-center gap-3">
                    <Link to={`/details/${meal.id}`} className="text-sm font-medium text-rose-600 hover:underline">Details</Link>
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Save for later"
                      onClick={() => toggleFavorite(meal)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M11.645 20.91a.75.75 0 0 1-.79 0c-1.873-1.12-3.995-2.885-5.66-4.768C3.48 14.667 2.25 12.77 2.25 10.5 2.25 7.186 4.936 4.5 8.25 4.5c1.676 0 3.174.696 4.25 1.811A5.864 5.864 0 0 1 16.75 4.5c3.314 0 6 2.686 6 6 0 2.27-1.23 4.167-2.945 5.642-1.665 1.883-3.787 3.649-5.66 4.768Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default CategoryProduct