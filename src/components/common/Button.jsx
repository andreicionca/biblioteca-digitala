import PropTypes from "prop-types";

function Button({ children, className, ...props }) {
  return (
    <button
      className={`uppercase py-2 px-4 font-semibold rounded-md cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: "",
};

export default Button;
