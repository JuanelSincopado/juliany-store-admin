import "../css/home_view.css";

import NavCustom from "../../../shared/components/nav";
import SearchProduct from "../components/search_product";
import ListProducts from "../components/list_products";
import PrimaryButton from "../../../shared/components/primary_button";
import CreateProductModel from "../components/create_product_model";
import CategoryContext from "../../category/context/category_context";
import { useContext, useEffect } from "react";
import ProductContext from "../../product/context/product_context";

const HomeView = () => {
  const { fetchCategories } = useContext(CategoryContext);
  const { createProductModal, setCreateProductModal, getProducts } =
    useContext(ProductContext);

  useEffect(() => {
    fetchCategories();
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavCustom page="product" />

      <div className="homeView__container">
        <div className="homeview_header">
          <SearchProduct />

          <PrimaryButton
            text="Crear producto"
            type="button"
            loading={false}
            onClick={() => setCreateProductModal(true)}
          />
        </div>

        <ListProducts />
      </div>

      {createProductModal && <CreateProductModel />}
    </>
  );
};

export default HomeView;
