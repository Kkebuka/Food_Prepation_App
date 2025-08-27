import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function useQueryParam(name) {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(name) || "", [search, name]);
}

export default function Meals() {
  const q = useQueryParam("query");
  const [sortOrder, setSortOrder] = useState("A-Z");

  const { data: byName } = useQuery({
    queryKey: ["searchName", q],
    queryFn: async () => {
      if (!q) return [];
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("search name failed");
      const json = await res.json();
      return json?.meals ?? [];
    },
  });

  const { data: byIngredient } = useQuery({
    queryKey: ["searchIngredient", q],
    queryFn: async () => {
      if (!q) return [];
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("search ingredient failed");
      const json = await res.json();
      return json?.meals ?? [];
    },
  });

  const merged = useMemo(() => {
    const seen = new Set();
    const result = [];
    const add = (m) => {
      const id = m.idMeal;
      if (seen.has(id)) return;
      seen.add(id);
      result.push({ id, name: m.strMeal, image: m.strMealThumb });
    };
    (byName || []).forEach(add);
    (byIngredient || []).forEach(add);
    result.sort((a, b) => (sortOrder === "A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    return result;
  }, [byName, byIngredient, sortOrder]);

  return (
    <main className="py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Search results</h1>
            <p className="mt-1 text-sm text-gray-600">Query: {q || "(none)"}</p>
          </div>
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200/70"
            >
              <option value="A-Z">Sort: A–Z</option>
              <option value="Z-A">Sort: Z–A</option>
            </select>
          </div>
        </div>

        {!q && <div className="py-10 text-center text-sm text-gray-500">Enter a search above to see results.</div>}
        {q && merged.length === 0 && <div className="py-10 text-center text-sm text-gray-500">No results found.</div>}

        {merged.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {merged.map((meal) => (
              <article key={meal.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
                  <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">{meal.name}</h3>
                  <Link to={`/details/${meal.id}`} className="text-sm font-medium text-rose-600 hover:underline">Details</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


