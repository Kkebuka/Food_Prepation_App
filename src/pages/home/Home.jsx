import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
  import Category from "./components/Categories";
import { useFavorites } from "../../contexts/FavoritesContext.jsx";
import HeroSection from "./components/HeroSection.jsx";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [startsWith, setStartsWith] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const json = await res.json();
      return json?.categories ?? [];
    },
  });

  const { data: mealsData, isLoading: mealsLoading } = useQuery({
    queryKey: ["meals", selectedCategory],
    queryFn: async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`);
      if (!res.ok) throw new Error("Failed to fetch meals");
      const json = await res.json();
      return json?.meals ?? [];
    },
  });

  const filteredMeals = useMemo(() => {
    let list = (mealsData || []).map((m) => ({ id: m.idMeal, name: m.strMeal, image: m.strMealThumb }));
    if (startsWith) {
      list = list.filter((m) => m.name.toLowerCase().startsWith(startsWith.toLowerCase()));
    }
    list.sort((a, b) => sortOrder === "A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    return list;
  }, [mealsData, sortOrder, startsWith]);

  const { toggleFavorite, favorites } = useFavorites();
  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection/>

      <Category />
      {/* Main Menu Section */}
      
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 sm:text-3xl sm:text-center lg:text-left">Main Menu</h2>
              <p className="mt-1 text-sm text-gray-600">Explore our favorites to get inspired.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200/70"
              >
                {(categories || []).map((c) => (
                  <option key={c.idCategory} value={c.strCategory}>{c.strCategory}</option>
                ))}
              </select>
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

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {mealsLoading && (
              <div className="col-span-full py-10 text-center text-sm text-gray-500">Loading meals...</div>
            )}
            {!mealsLoading && filteredMeals.map((meal) => (
              <Link to={`/details/${meal.id}`}>
              <article
                key={meal.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
                  <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
                    {meal.name}
                  </h3>
                   
                  <button
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-rose-300 hover:bg-rose-50 ${favoriteIds.has(meal.id) ? "border-rose-300 bg-rose-50 text-rose-600" : "border-gray-200 text-gray-700"}`}
                    aria-label="Save for later"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(meal); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-5 w-5 ${favoriteIds.has(meal.id) ? "text-rose-600" : "text-current"}`}>
                      <path d="M11.645 20.91a.75.75 0 0 1-.79 0c-1.873-1.12-3.995-2.885-5.66-4.768C3.48 14.667 2.25 12.77 2.25 10.5 2.25 7.186 4.936 4.5 8.25 4.5c1.676 0 3.174.696 4.25 1.811A5.864 5.864 0 0 1 16.75 4.5c3.314 0 6 2.686 6 6 0 2.27-1.23 4.167-2.945 5.642-1.665 1.883-3.787 3.649-5.66 4.768Z"/>
                    </svg>
                  </button>
                </div>
               
              </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M7.5 2.25a.75.75 0 0 1 .75.75v6a2.25 2.25 0 1 1-4.5 0v-6a.75.75 0 0 1 1.5 0v2.25h.75V3a.75.75 0 0 1 1.5 0v2.25h.75V3a.75.75 0 0 1 .75-.75ZM14.25 2.25a.75.75 0 0 0-.75.75v6.75a3.75 3.75 0 0 0 3.75 3.75h.75V3a.75.75 0 0 0-1.5 0v3h-1.5V3a.75.75 0 0 0-1.5 0v3h-1.5V3a.75.75 0 0 0-.75-.75Z"/>
                </svg>
              </span>
              <span className="text-sm font-semibold text-gray-900">Foodcourt</span>
            </div>
            <p className="text-center text-xs text-gray-500 sm:text-sm">© {new Date().getFullYear()} Foodcourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
