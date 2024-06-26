import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange }) => {
  const id = `field-${name}`;

  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          id={id}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea 
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          data-testid="field-testid" 
        />
      );
      break;
    default:
      component = (
        <input
          id={id}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
  }

  return (
    <div className="inputField">
      <label htmlFor={id}>{label}</label>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  value: "",
  onChange: () => {},
};

export default Field;