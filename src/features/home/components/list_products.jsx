// import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import ProductContext from "../../product/context/product_context";
import { formatNumber } from "../../../shared/utils/format_numbers";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
  const { products, productsLoading } = useContext(ProductContext);

  if (productsLoading) {
    return (
      <div className="loader__container">
        <span className="bigLoader"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="not-found">No se encontraron productos</p>;
  }

  return (
    <div className="list__items">
      {products.map((product) => (
        <CardItem key={product.id} {...product} />
      ))}
    </div>
  );
};

const CardItem = (product) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${product.id}`);
  };

  const showPrice = () => {
    const selectedCountry =
      product.country.find((c) => parseInt(c.price) > 0) || product.country[1];

    const { price, country } = selectedCountry;

    const currency = country === "Venezuela" ? "Bs." : "COP";

    return `${currency} ${formatNumber(price)}`;
  };

  return (
    <div className="card_item" onClick={handleClick}>
      <img src={product.url_image[0]} alt="item" className="card_item__img" />

      <div className="card_item__info">
        <h3>{product.name}</h3>

        <p className="card_item__description">{product.description}</p>

        <p className="card_item__price">{formatNumber(showPrice())}</p>
      </div>
    </div>
  );
};

export default ListProducts;
