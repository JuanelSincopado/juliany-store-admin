import { useState } from "react";
import supabase from "../../../config/supabase";
import CategoryContext from "./category_context";

const CategoryState = ({ children }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});

  const fetchCategories = async () => {
    setCategoriesLoading(true);

    try {
      const { data, error } = await supabase.from("category").select("*");

      if (error) {
        console.error(error);
        alert("Ocurrio un error al obtener las categorias");
        return;
      }

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const createCategory = async (text) => {
    setLocalLoading(true);

    try {
      const { error } = await supabase.from("category").insert({ name: text });

      if (error) {
        console.error(error);
        alert("Ocurrio un error al crear la categoria");
        return;
      }

      alert("Categoria creada correctamente");
      fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  };

  const updateCategory = async (text) => {
    setLocalLoading(true);

    try {
      const { error } = await supabase
        .from("category")
        .update({ name: text })
        .eq("id", categorySelected.id);

      if (error) {
        console.error(error);
        alert("Ocurrio un error al actualizar la categoria");
        return;
      }

      alert("Categoria actualizada correctamente");
      fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    const result = confirm("¿Estas seguro de eliminar la categoria?");

    if (!result) {
      return;
    }

    setCategoriesLoading(true);

    try {
      const { error } = await supabase.from("category").delete().eq("id", id);

      if (error) {
        console.error(error);
        alert("Ocurrio un error al eliminar la categoria");
        return;
      }

      alert("Categoria eliminada correctamente");
      fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categorySelected,
        localLoading,
        categoriesLoading,
        createCategory,
        fetchCategories,
        updateCategory,
        deleteCategory,
        setCategorySelected,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
