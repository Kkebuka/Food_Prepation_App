import React from "react";

function Home() {
  const meals = [
    {
      id: 1,
      name: "Spicy Shrimp Ramen",
      image:
        "https://images.unsplash.com/photo-1546549039-49cc4f5b6c28?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Grilled Chicken Bowl",
      image:
        "https://images.unsplash.com/photo-1604908554027-669a4f6c1c5f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Creamy Pesto Pasta",
      image:
        "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Steak with Herb Butter",
      image:
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Veggie Avocado Toast",
      image:
        "https://images.unsplash.com/photo-1542691457-cbe4df041eb2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Berry Pancake Stack",
      image:
        "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-justify text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                Home of delicious recipe
              </h1>
              <p className="mt-4 text-justify text-base text-gray-600 sm:text-lg">
                Experience the process of making the best meals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Main Menu</h2>
              <p className="mt-1 text-sm text-gray-600">Explore our favorites to get inspired.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {meals.map((meal) => (
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Save for later"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M11.645 20.91a.75.75 0 0 1-.79 0c-1.873-1.12-3.995-2.885-5.66-4.768C3.48 14.667 2.25 12.77 2.25 10.5 2.25 7.186 4.936 4.5 8.25 4.5c1.676 0 3.174.696 4.25 1.811A5.864 5.864 0 0 1 16.75 4.5c3.314 0 6 2.686 6 6 0 2.27-1.23 4.167-2.945 5.642-1.665 1.883-3.787 3.649-5.66 4.768Z"/>
                    </svg>
                  </button>
                </div>
              </article>
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
              <span className="text-sm font-semibold text-gray-900">TastyBites</span>
            </div>
            <p className="text-center text-xs text-gray-500 sm:text-sm">© {new Date().getFullYear()} TastyBites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
