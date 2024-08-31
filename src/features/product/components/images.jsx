import UpdateImageInput from "../../../shared/components/update_image";

const Images = ({ productToUpdate }) => {
  return (
    <div className="image__udpate">
      <label>Imágenes</label>

      {productToUpdate?.url_image && (
        <div>
          <UpdateImageInput
            id="detailsImages1"
            imageDefault={productToUpdate.url_image[0] || ""}
          />

          <UpdateImageInput
            id="detailsImages2"
            imageDefault={productToUpdate.url_image[1] || ""}
          />

          <UpdateImageInput
            id="detailsImages3"
            imageDefault={productToUpdate.url_image[2] || ""}
          />
        </div>
      )}
    </div>
  );
};

export default Images;
