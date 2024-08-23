import { useContext } from "react";
import PrimaryButton from "../../../shared/components/primary_button";
import CategoryContext from "../context/category_context";

const ModalEdit = () => {
  const {
    categorySelected,
    localLoading,
    setCategorySelected,
    updateCategory,
  } = useContext(CategoryContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const text = e.target.category.value;

    if (!text) {
      alert("El campo no puede estar vacio");
      return;
    }

    updateCategory(text);
  };

  return (
    <div className="modalEdit__container">
      <div className="modalEdit__content">
        <button className="close" onClick={() => setCategorySelected({})}>
          X
        </button>
        <h2>Editar Categoria</h2>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={categorySelected.name}
          />
          <PrimaryButton loading={localLoading} text="Editar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
