import { useContext } from "react";
import PrimaryButton from "../../../shared/components/primary_button";
import { formatNumber } from "../../../shared/utils/format_numbers";
import CategoryContext from "../../category/context/category_context";
import ProductContext from "../../product/context/product_context";
import UpdateImageInput from "../../../shared/components/update_image";

const CreateProductModel = () => {
  const { categories, categoriesLoading } = useContext(CategoryContext);
  const {
    setNewProduct,
    createProduct,
    setCreateProductModal,
    productUpdateLoading,
  } = useContext(ProductContext);

  // Función genérica para manejar cambios de input
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Función para manejar cambios de precio con formato
  const handlePriceChange = (e, country) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Eliminar puntos
    const formattedValue = formatNumber(rawValue);
    e.target.value = formattedValue; // Actualizar el valor del input con formato

    setNewProduct((prevState) => {
      const countries = [...prevState.country];
      const countryIndex = countries.findIndex((c) => c.country === country);

      if (countryIndex === -1) {
        countries.push({ country, price: parseInt(rawValue, 10) || 0 });
      } else {
        countries[countryIndex].price = rawValue;
      }

      return {
        ...prevState,
        country: countries,
      };
    });
  };

  const handleCloseModal = () => {
    setCreateProductModal(false);
    setNewProduct({
      name: "",
      description: "",
      category: "",
      url_image: [],
      country: [],
      visible: true,
    });
  };

  return (
    <div className="createProductModel__bg">
      <div className="createProductModel__container">
        <h2>Crear producto</h2>

        <div className="input__container">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" onChange={handleInputChange} />
        </div>

        <div className="uploadImage__container">
          <label>Subir imagen</label>

          <div className="inputUploadImage__container">
            <UpdateImageInput id="createProduct_updateImage1" />
            <UpdateImageInput id="createProduct_updateImage2" />
            <UpdateImageInput id="createProduct_updateImage3" />
          </div>
        </div>

        <div className="input__container">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" onChange={handleInputChange}></textarea>
        </div>

        {categoriesLoading ? (
          <div className="loader__container">
            <span className="min__loader"></span>
          </div>
        ) : (
          <div className="select__container">
            <label htmlFor="category">Categoría</label>
            <select id="category" onChange={handleInputChange} defaultValue="">
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

        <div className="select__container">
          <label htmlFor="visible">Visible</label>
          <input
            type="checkbox"
            id="visible"
            className="checkbox"
            onChange={handleInputChange}
            defaultChecked={true}
          />
        </div>

        {["Venezuela", "Colombia"].map((country) => (
          <div className="input__price_container" key={country}>
            <label>
              Precio en {country === "Venezuela" ? "Bolívares" : "Pesos"}:
            </label>
            <input
              type="text"
              onChange={(e) => handlePriceChange(e, country)}
            />
          </div>
        ))}

        <div className="buttons">
          <PrimaryButton
            loading={productUpdateLoading}
            onClick={createProduct}
            text="Crear Producto"
            type="button"
            className="save"
          />

          <PrimaryButton
            text="Cancelar"
            onClick={() => handleCloseModal()}
            type="button"
            className="cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductModel;
