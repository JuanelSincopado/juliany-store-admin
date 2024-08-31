import { useContext } from "react";
import CategoryContext from "../context/category_context";

const CategoriesList = () => {
  const { categories, categoriesLoading, deleteCategory, setCategorySelected } =
    useContext(CategoryContext);

  if (categoriesLoading) {
    return (
      <div className="loader__container">
        <span className="bigLoader"></span>
      </div>
    );
  }

  return (
    <table className="table_categories">
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td className="td_actions">
              <button
                className="edit"
                onClick={() => setCategorySelected(category)}
              >
                Editar
              </button>
              <button
                className="delete"
                onClick={() => deleteCategory(category.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesList;
