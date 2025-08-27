import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Category from "./pages/category/Category";
import FoodDetails from "./pages/foodDetails/FoodDetails";
import CategoryProduct from "./pages/categoryProducts/categoryProduct";
import Home from "./pages/home/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index path="" element={<Home />} />
          <Route index path="categories" element={<Category />} />
          <Route index path="details/:id" element={<FoodDetails />} />
          <Route index path="category/:name" element={<CategoryProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
