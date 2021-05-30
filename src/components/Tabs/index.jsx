import React from "react";
import "./tab.css";

const Tabs = ({ active, onChange, children }) => {
  return (
    <div className="tabs-container">
      <div className="tabs">
        {children.map((c, index) => (
          <div
            className={`tab-buttons ${active === index ? "active" : ""} ${
              c.props.disabled ? "disabled" : ""
            }`}
            key={index}
          >
            <button onClick={() => onChange(index)}>{c.props.title}</button>
          </div>
        ))}
      </div>
      <div className="tab-content">{children[active]}</div>
    </div>
  );
};

export default Tabs;
