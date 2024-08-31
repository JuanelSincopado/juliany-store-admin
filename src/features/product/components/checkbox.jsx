import { useContext } from "react";
import ProductContext from "../context/product_context";

const Checkbox = ({ visible }) => {
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
      <label htmlFor="visible">Visible</label>
      <input
        type="checkbox"
        id="visible"
        className="checkbox"
        onChange={handleInputChange}
        defaultChecked={visible}
      />
    </div>
  );
};

export default Checkbox;
