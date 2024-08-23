import { useContext, useState } from "react";
import PrimaryButton from "../../../shared/components/primary_button";
import CategoryContext from "../context/category_context";

const CreateCategory = () => {
  const { localLoading, createCategory } = useContext(CategoryContext);

  const [category, setCategory] = useState("");

  const handleOnChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "") return alert("El campo no puede estar vacio");

    createCategory(category);

    setCategory("");
  };

  return (
    <div className="category__create">
      <p>Crear Categoria</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          id="name"
          placeholder="Nombre de categoria"
          value={category}
          onChange={handleOnChange}
        />
        <PrimaryButton type="submit" text="Crear" loading={localLoading} />
      </form>
    </div>
  );
};

export default CreateCategory;
