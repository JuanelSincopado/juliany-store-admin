import { useContext, useState } from "react";
import PrimaryButton from "../../../shared/components/primary_button";
import ProductContext from "../../product/context/product_context";

const SearchProduct = () => {
  const { searchProduct } = useContext(ProductContext);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const search = document.getElementById("search-input").value;

    setSearch(search);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    searchProduct(search);
  };

  return (
    <form className="search__product" onSubmit={onSubmit}>
      <div className="input-search">
        <label htmlFor="search-input">Buscar producto</label>
        <input
          type="text"
          id="search-input"
          placeholder="Buscar producto"
          onChange={handleSearch}
        />
      </div>
      <PrimaryButton
        text="Search"
        type="button"
        loading={false}
        onClick={onSubmit}
      />
    </form>
  );
};

export default SearchProduct;
