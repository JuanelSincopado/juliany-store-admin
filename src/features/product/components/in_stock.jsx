import { useContext } from "react";
import ProductContext from "../context/product_context";

const InStock = ({ status }) => {
  const { setProductToUpdate } = useContext(ProductContext);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setProductToUpdate((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="select__container">
      <label htmlFor="status">Disponibilidad</label>
      <select
        defaultValue={String(status)}
        name="status"
        id="status"
        onChange={handleInputChange}
      >
        <option value={1}>Disponible</option>
        <option value={2}>Agotado</option>
      </select>
    </div>
  );
};

export default InStock;
