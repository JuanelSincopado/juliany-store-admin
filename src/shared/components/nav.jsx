const NavCustom = ({ page }) => {
  return (
    <nav className="">
      <a href="/" className={page == "product" ? "active" : ""}>
        Productos
      </a>
      <a href="/category" className={page != "product" ? "active" : ""}>
        Categorias
      </a>
    </nav>
  );
};

export default NavCustom;
