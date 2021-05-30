import { useState } from "react";

const Dropdown = ({
  label,
  className,
  value,
  keyToMatch,
  list,
  onChange,
  multiSelect,
  name,
  selectedKeysArr,
}) => {
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  let dropdownVal = "";
  if (value) {
    if (multiSelect) {
      dropdownVal = value.map((item) => item.name).join(" | ");
      if (dropdownVal.length > 40) {
        dropdownVal = `${selectedKeysArr.length} Selected`;
      }
    } else if (keyToMatch) {
      dropdownVal = value[keyToMatch];
    } else {
      dropdownVal = value;
    }
  }
  const handleChange = (item) => {
    let updatedValue = item;
    let updatedKeysArr = selectedKeysArr || [];
    if (multiSelect) {
      updatedValue = value || [];
      const itemIndex = updatedKeysArr.indexOf(item[keyToMatch]);
      if (itemIndex > -1) {
        updatedValue.splice(itemIndex, 1);
        updatedKeysArr.splice(itemIndex, 1);
      } else {
        updatedValue.push(item);
        updatedKeysArr.push(item[keyToMatch]);
      }
    }
    onChange({
      target: {
        value: updatedValue,
        name,
        updatedKeysArr,
      },
    });
    toggle();
  };
  const toggle = () => {
    setShowCheckBoxes(!showCheckBoxes);
  };
  return (
    <form>
      <div className={`input-field-container ${className ? className : ""}`}>
        {label && <div className="label">{label}</div>}

        <div
          className={`selectBox ${showCheckBoxes ? "active" : ""}`}
          onClick={toggle}
        >
          <select className="form-input">
            <option>{dropdownVal || "Select an option"}</option>
          </select>
          <div className="overSelect"></div>
        </div>
        {showCheckBoxes && (
          <div className="select-checkboxes">
            {list.map((option, index) => (
              <label
                htmlFor={keyToMatch ? option[keyToMatch] : option}
                key={index}
                className={`select-label ${
                  (multiSelect &&
                    selectedKeysArr.includes(option[keyToMatch])) ||
                  (keyToMatch && option[keyToMatch] === value[keyToMatch]) ||
                  option === value
                    ? "active"
                    : ""
                }`}
                onClick={() => handleChange(option)}
              >
                {multiSelect && (
                  <input
                    type="checkbox"
                    id={keyToMatch ? option[keyToMatch] : option}
                    defaultChecked={selectedKeysArr.includes(
                      option[keyToMatch]
                    )}
                  />
                )}
                {keyToMatch ? option.name : option}
              </label>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default Dropdown;
