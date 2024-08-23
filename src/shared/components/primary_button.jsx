const PrimaryButton = ({ type, text, loading, onClick, className }) => {
  return (
    <button
      type={type}
      className={`primary-btn ${className ? className : ""}`}
      onClick={onClick}
    >
      {loading ? <span className="loader"></span> : text}
    </button>
  );
};

export default PrimaryButton;
