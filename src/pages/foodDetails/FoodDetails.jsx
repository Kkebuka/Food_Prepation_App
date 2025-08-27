import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function FoodDetails() {
  // const { id } = useParams();
  const navigate = useNavigate();
  let id = 52874

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      return json?.meals?.[0] ?? null;
    },
    enabled: Boolean(id),
  });

  const ingredients = useMemo(() => {
    if (!data) return [];
    const pairs = [];
    for (let i = 1; i <= 20; i++) {
      const ing = data[`strIngredient${i}`];
      const meas = data[`strMeasure${i}`];
      if (ing && ing.trim()) {
        pairs.push({ ingredient: ing.trim(), measure: (meas || "").trim() });
      }
    }
    return pairs;
  }, [data]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-9 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-gray-200" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-gray-200" />
              ))}
            </div>
            <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M9.53 4.47a.75.75 0 0 1 0 1.06L5.06 10h14.19a.75.75 0 0 1 0 1.5H5.06l4.47 4.47a.75.75 0 0 1-1.06 1.06l-5.75-5.75a.75.75 0 0 1 0-1.06l5.75-5.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <p className="mt-6 text-sm text-gray-600">Unable to load meal details.</p>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M9.53 4.47a.75.75 0 0 1 0 1.06L5.06 10h14.19a.75.75 0 0 1 0 1.5H5.06l4.47 4.47a.75.75 0 0 1-1.06 1.06l-5.75-5.75a.75.75 0 0 1 0-1.06l5.75-5.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={data.strMealThumb}
              alt={data.strMeal}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {data.strMeal}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              {data.strCategory && (
                <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700">
                  Category: {data.strCategory}
                </span>
              )}
              {data.strArea && (
                <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700">
                  Area: {data.strArea}
                </span>
              )}
            </div>

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="mt-6">
                <h2 className="text-base font-semibold text-gray-900">Ingredients</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {ingredients.map((it, idx) => (
                    <li key={idx} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm">
                      <span className="font-medium text-gray-800">{it.ingredient}</span>
                      <span className="text-gray-600">{it.measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {data.strInstructions && (
          <section className="mt-10">
            <h2 className="text-base font-semibold text-gray-900">Preparation</h2>
            <p className="prose mt-3 max-w-none whitespace-pre-line text-sm leading-7 text-gray-700">
              {data.strInstructions}
            </p>
          </section>
        )}

        {/* YouTube */}
        {data.strYoutube && (
          <section className="mt-10">
            <h2 className="text-base font-semibold text-gray-900">Watch on YouTube</h2>
            <a
              href={data.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M10.25 6.5a.75.75 0 0 1 1.5 0v4.69l3.53 3.53a.75.75 0 1 1-1.06 1.06l-3.72-3.72a.75.75 0 0 1-.22-.53V6.5Z" />
              </svg>
              Open video
            </a>
          </section>
        )}
      </div>
    </main>
  );
}

export default FoodDetails;
