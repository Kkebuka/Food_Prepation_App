import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Categories from "./pages/categories/Categories";
import FoodDetails from "./pages/foodDetails/FoodDetails";
import Home from "./pages/home/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index path="" element={<Home />} />
          <Route index path="categories" element={<Categories />} />
          <Route index path="details" element={<FoodDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
