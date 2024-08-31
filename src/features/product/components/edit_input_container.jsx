import { useContext } from "react";
import ProductContext from "../context/product_context";

const EditInputContainer = ({ label, input, textArea }) => {
  const { setProductToUpdate } = useContext(ProductContext);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductToUpdate((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="edit__input_container">
      <label htmlFor={label}>{label}</label>

      {textArea ? (
        <textarea
          id="description"
          defaultValue={textArea}
          rows="4"
          cols="50"
          onChange={handleInputChange}
        ></textarea>
      ) : (
        <input
          type="text"
          id="name"
          defaultValue={input}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default EditInputContainer;
