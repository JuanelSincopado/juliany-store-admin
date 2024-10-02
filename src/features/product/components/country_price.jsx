import { useContext } from "react";
import { formatNumber } from "../../../shared/utils/format_numbers";
import ProductContext from "../context/product_context";

const CountryPrice = ({ countryParams }) => {
  const { setProductToUpdate } = useContext(ProductContext);

  const handlePriceChange = (e, country) => {
    const rawValue = e.target.value.replace(/\./g, "");
    const formattedValue = formatNumber(rawValue);
    e.target.value = formattedValue;

    // Actualizar el precio del país en el estado
    setProductToUpdate((prevState) => {
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

  return (
    <>
      {["Venezuela", "Colombia"].map((country) => (
        <div className="input__price_container" key={country}>
          <label>
            Precio en {country === "Venezuela" ? "Dólares" : "Pesos"}:
          </label>
          <input
            type="text"
            defaultValue={
              countryParams.find((item) => item.country === country)?.price
            }
            onChange={(e) => handlePriceChange(e, country)}
          />
        </div>
      ))}
    </>
  );
};

export default CountryPrice;
