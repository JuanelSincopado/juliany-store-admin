import { useContext } from "react";
import CategoryContext from "../../category/context/category_context";
import ProductContext from "../context/product_context";

const SelectCategory = ({ id }) => {
  const { categories, categoriesLoading } = useContext(CategoryContext);
  const { setProductToUpdate } = useContext(ProductContext);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductToUpdate((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  return (
    <>
      {categoriesLoading ? (
        <div className="loader__container">
          <span className="min__loader"></span>
        </div>
      ) : (
        <div className="select__container">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            defaultValue={id}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Seleccione una Categoria
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default SelectCategory;
