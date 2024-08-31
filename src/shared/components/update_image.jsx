import { useContext, useState } from "react";
import ProductContext from "../../features/product/context/product_context";

const UpdateImageInput = ({ id, imageDefault }) => {
  const { returnUrlImage, setNewProduct, setProductToUpdate } =
    useContext(ProductContext);

  const [image, setImage] = useState(imageDefault);
  const [loading, setLoading] = useState(false);

  const handleOnChangeImage = async (e) => {
    setLoading(true);

    if (e === undefined) return;

    const url = await returnUrlImage(e);

    if (!url) return setLoading(false);

    //Get url Path
    const urlPath = window.location.pathname.split("/");

    if (urlPath[1] === "details") {
      setProductToUpdate((prevState) => ({
        ...prevState,
        url_image: [...prevState.url_image, url],
      }));
    } else {
      setNewProduct((prevState) => ({
        ...prevState,
        url_image: [...prevState.url_image, url],
      }));
    }

    setImage(url);

    setLoading(false);
  };

  const handleDeleteImage = () => {
    setImage("");

    if (imageDefault) {
      setProductToUpdate((prevState) => ({
        ...prevState,
        url_image: prevState.url_image.filter((url) => url !== image),
      }));

      return;
    }

    setNewProduct((prevState) => ({
      ...prevState,
      url_image: prevState.url_image.filter((url) => url !== image),
    }));
  };

  return (
    <>
      {image ? (
        <div className="image__container">
          <img
            src={image}
            alt="uploaded"
            className="uploaded-image"
            onClick={() => document.getElementById(`${id}`).click()}
            style={{ cursor: "pointer" }}
          />
          <button className="delete_button_image" onClick={handleDeleteImage}>
            X
          </button>
        </div>
      ) : (
        <div
          className="upload_image"
          onClick={() => document.getElementById(`${id}`).click()}
        >
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <p>Subir imagen</p>
            </>
          )}
        </div>
      )}
      <input
        type="file"
        id={id}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleOnChangeImage(e.target.files[0])}
      />
    </>
  );
};

export default UpdateImageInput;
