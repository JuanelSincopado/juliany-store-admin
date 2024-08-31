import { useState } from "react";
import ProductContext from "./product_context";
import supabase from "../../../config/supabase";
import { v4 as uuidv4 } from "uuid";

const ProductState = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  //TODO: Cambiar a null
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    url_image: [],
    status: 1,
    category: 0,
    visible: true,
    country: [],
  });

  // const [newProduct, setNewProduct] = useState(null);
  const [uploadProductLoading, setUploadProductLoading] = useState(false);

  const [createProductModal, setCreateProductModal] = useState(false);

  const [productToUpdate, setProductToUpdate] = useState(null);
  const [productUpdateLoading, setProductUpdateLoading] = useState(false);

  const getProducts = async () => {
    setProductsLoading(true);
    try {
      const { data, error } = await supabase.from("product").select();

      if (error) {
        console.error(error);
        alert("An unexpected error occurred");
        return;
      }

      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    } finally {
      setProductsLoading(false);
    }
  };

  const searchProduct = async (search) => {
    setProductsLoading(true);
    try {
      if (search === "") {
        getProducts();
        return;
      }

      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("visible", true)
        .ilike("name", `%${search.toLowerCase()}%`);

      if (error) {
        console.error(error);
        alert("An unexpected error occurred");
        return;
      }

      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    } finally {
      setProductsLoading(false);
    }
  };

  const returnUrlImage = async (file) => {
    try {
      // Verificar que el archivo sea una imagen
      if (!file.type.includes("image")) {
        alert("Solo se permiten imágenes");
        return;
      }

      // nombre único para la imagen
      const newName = `${uuidv4()}.${file.name.split(".").pop()}`;

      // Subir la imagen
      const { error: uploadError } = await supabase.storage

        .from("image")
        .upload(`product/${newName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading file: ", uploadError.message);
        alert("Error uploading file");
        return;
      }

      // Obtener la URL pública
      const { data } = supabase.storage
        .from("image")
        .getPublicUrl(`product/${newName}`);

      if (!data) {
        console.error("Error getting public URL: ", data);
        alert("Error getting public URL");
        return;
      }

      return data.publicUrl;
    } catch (error) {
      console.error("Error: ", error.message);
      alert("An unexpected error occurred");
    }
  };

  const createProduct = async () => {
    setUploadProductLoading(true);
    try {
      if (
        newProduct.name === "" ||
        newProduct.description === "" ||
        newProduct.url_image.length === 0 ||
        newProduct.category === 0 ||
        newProduct.country.length === 0
      ) {
        alert("Por favor completa todos los campos");
        return;
      }

      const { error } = await supabase.from("product").insert([newProduct]);

      if (error) {
        console.error(error);
        alert("An unexpected error occurred");
        return;
      }

      alert("Product created successfully");
      getProducts();
      setCreateProductModal(false);
      setNewProduct({
        name: "",
        description: "",
        url_image: [],
        status: 1,
        category: 0,
        visible: true,
        country: [],
      });
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    } finally {
      setUploadProductLoading(false);
    }
  };

  const getProductById = async (id) => {
    setProductUpdateLoading(true);
    try {
      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("id", id);

      if (error) {
        console.error(error);
        alert("An unexpected error occurred");
        return;
      }

      setProductToUpdate(data[0]);
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    } finally {
      setProductUpdateLoading(false);
    }
  };

  const updateProduct = async (id) => {
    try {
      if (
        productToUpdate.name === "" ||
        productToUpdate.description === "" ||
        productToUpdate.url_image.length === 0 ||
        productToUpdate.category === 0 ||
        productToUpdate.country.length === 0
      ) {
        alert("Por favor completa todos los campos");
        return;
      }

      const { error } = await supabase
        .from("product")
        .update(productToUpdate)
        .eq("id", id);

      if (error) {
        console.error(error);
        alert("An unexpected error occurred");
        return;
      }

      alert("Product updated successfully");
      getProductById(id);
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from("product").delete().eq("id", id);

      if (error) {
        console.error(error);
        alert("An unexpected error occurred");
        return;
      }

      alert("Product deleted successfully");

      getProducts();
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        // States
        products,
        productsLoading,
        uploadProductLoading,
        newProduct,
        createProductModal,
        productUpdateLoading,
        productToUpdate,
        // Functions
        getProducts,
        searchProduct,
        setNewProduct,
        setProductToUpdate,
        updateProduct,
        createProduct,
        setCreateProductModal,
        getProductById,
        deleteProduct,
        returnUrlImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
