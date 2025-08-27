import React from "react";
import { useQuery } from "@tanstack/react-query";

function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  console.log(data);
  return <div>Categories</div>;
}

export default Categories;
