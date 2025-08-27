import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  addFavorite: (_meal) => {},
  removeFavorite: (_id) => {},
  toggleFavorite: (_meal) => {},
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const addFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === meal.id)) return prev;
      return [...prev, meal];
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === meal.id);
      if (exists) return prev.filter((m) => m.id !== meal.id);
      return [...prev, meal];
    });
  }, []);

  const value = useMemo(() => ({ favorites, addFavorite, removeFavorite, toggleFavorite }), [favorites, addFavorite, removeFavorite, toggleFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}


