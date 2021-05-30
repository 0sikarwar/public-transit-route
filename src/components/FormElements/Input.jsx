const Input = ({ label, className, ...rest }) => (
  <div className="input-field-container">
    {label && <div className="label">{label}</div>}
    <input {...rest} className={`form-input ${className || ""}`} />
  </div>
);

export default Input;
