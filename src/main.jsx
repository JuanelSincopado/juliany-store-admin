import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./features/home/view/home_view.jsx";
import CategoryView from "./features/category/view/category_view.jsx";
import CategoryState from "./features/category/context/category_state.jsx";
import ProductState from "./features/product/context/product_state.jsx";
import DetailsView from "./features/product/view/details_view.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "details/:id",
    // errorElement: <ErrorDetailsView />,
    element: <DetailsView />,
  },
  {
    path: "category",
    element: <CategoryView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductState>
      <CategoryState>
        <RouterProvider router={router} />
      </CategoryState>
    </ProductState>
  </React.StrictMode>
);
