import "../css/categorie.css";

import CreateCategory from "../components/create_category";
import { useContext, useEffect } from "react";
import CategoryContext from "../context/category_context";
import CategoriesList from "../components/categories_list";
import NavCustom from "../../../shared/components/nav";
import ModalEdit from "../components/modal_edit";

const CategoryView = () => {
  const { categorySelected, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavCustom page="category" />
      <div className="category__container">
        <CreateCategory />

        <CategoriesList />

        {categorySelected.id && <ModalEdit />}
      </div>
    </>
  );
};

export default CategoryView;
