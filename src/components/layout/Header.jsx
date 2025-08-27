import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext.jsx";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const { favorites } = useFavorites();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setIsMobileOpen(false);
    navigate(`/meals?query=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto  sm:px-6 ">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-sm">
              {/* Fork/knife icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M7.5 2.25a.75.75 0 0 1 .75.75v6a2.25 2.25 0 1 1-4.5 0v-6a.75.75 0 0 1 1.5 0v2.25h.75V3a.75.75 0 0 1 1.5 0v2.25h.75V3a.75.75 0 0 1 .75-.75ZM14.25 2.25a.75.75 0 0 0-.75.75v6.75a3.75 3.75 0 0 0 3.75 3.75h.75V3a.75.75 0 0 0-1.5 0v3h-1.5V3a.75.75 0 0 0-1.5 0v3h-1.5V3a.75.75 0 0 0-.75-.75Z"/>
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 bg-clip-text text-transparent">Tasty</span>
              <span className="text-gray-900">Bites</span>
            </span>
          </Link>

          {/* Center: Search */}
          <div className="mx-4 hidden flex-1 sm:mx-6 md:block">
            <form className="relative" onSubmit={onSearchSubmit}>
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.243 12.002l4.002 4.002a.75.75 0 1 0 1.06-1.06l-4.002-4.002A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search dishes, ingredients, cuisines..."
                className="w-full rounded-full border border-gray-200 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200/70"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/categories" className="hidden rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 md:inline-flex">
              Category
            </Link>
            {/* <Link to="/meals" className="hidden rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 md:inline-flex">
              Meal
            </Link> */}
            <button aria-label="Keep for later" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full cursor-pointer border border-gray-200 text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50" onClick={() => setIsFavOpen((v) => !v)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M11.645 20.91a.75.75 0 0 1-.79 0c-1.873-1.12-3.995-2.885-5.66-4.768C3.48 14.667 2.25 12.77 2.25 10.5 2.25 7.186 4.936 4.5 8.25 4.5c1.676 0 3.174.696 4.25 1.811A5.864 5.864 0 0 1 16.75 4.5c3.314 0 6 2.686 6 6 0 2.27-1.23 4.167-2.945 5.642-1.665 1.883-3.787 3.649-5.66 4.768Z"/>
              </svg>
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold leading-none text-white">{favorites.length}</span>
            </button>
            {/* Favorites dropdown */}
            {isFavOpen && (
              <div className="absolute right-4 top-16 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
                <h4 className="px-1 pb-2 text-sm font-semibold text-gray-800">Saved favorites</h4>
                <div className="max-h-72 space-y-2 overflow-auto pr-1">
                  {favorites.length === 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">No favorites yet</div>
                  )}
                  {favorites.map((m) => (
                    <Link key={m.id} to={`/details/${m.id}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
                      <img src={m.image} alt={m.name} className="h-10 w-10 rounded object-cover" />
                      <div className="line-clamp-2 text-sm text-gray-800">{m.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <button
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 md:hidden"
              onClick={() => setIsMobileOpen((v) => !v)}
            >
              {isMobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M3.75 5.25A.75.75 0 0 1 4.5 4.5h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 7.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 7.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile: Search + Menu */}
        <div className={`${isMobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} grid transition-all duration-300 ease-out md:hidden`}>
          <div className="overflow-hidden">
            <div className="pb-3 pt-2">
              <form className="relative" onSubmit={onSearchSubmit}>
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.243 12.002l4.002 4.002a.75.75 0 1 0 1.06-1.06l-4.002-4.002A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search dishes, ingredients, cuisines..."
                  className="w-full rounded-full border border-gray-200 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200/70"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              <nav className="mt-3 grid gap-1">
                <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Home</Link>
                <Link to="/categories" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Category</Link>
                <Link to="/meals" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Meal</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
