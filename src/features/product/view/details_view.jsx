import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductContext from "../context/product_context";
import "../css/product.css";
import EditInputContainer from "../components/edit_input_container";
import Images from "../components/images";
import CategoryContext from "../../category/context/category_context";
import SelectCategory from "../components/select_category";
import Checkbox from "../components/checkbox";
import CountryPrice from "../components/country_price";
import PrimaryButton from "../../../shared/components/primary_button";

const DetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    productToUpdate,
    productUpdateLoading,
    getProductById,
    updateProduct,
    deleteProduct,
    // setProductToUpdate,
  } = useContext(ProductContext);

  const { fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    getProductById(id);
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (productUpdateLoading) {
    return (
      <div className="loader__container">
        <span className="bigLoader"></span>
      </div>
    );
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este producto?")) {
      await deleteProduct(id);

      navigate("/");
    }
  };

  return (
    <div className="details__container">
      <EditInputContainer label="Nombre" input={productToUpdate?.name} />

      <Images productToUpdate={productToUpdate} />

      <SelectCategory id={productToUpdate?.category_id} />

      <EditInputContainer
        label="Descripción"
        textArea={productToUpdate?.description}
      />

      <Checkbox visible={productToUpdate?.visible} />

      {productToUpdate && (
        <CountryPrice countryParams={productToUpdate?.country} />
      )}

      <div className="buttons">
        <PrimaryButton
          text="Eliminar producto"
          onClick={() => handleDeleteProduct(id)}
          type="button"
          className="cancel"
        />

        <PrimaryButton
          loading={productUpdateLoading}
          onClick={() => updateProduct(productToUpdate.id)}
          text="Actualizar Producto"
          type="button"
          className="save"
        />
      </div>
    </div>
  );
};

export default DetailsView;
