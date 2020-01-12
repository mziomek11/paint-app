import React, { useState } from "react";
import Brush from "../draw/Brush";
import Rubber from "../draw/Rubber";
import Line from "../draw/Line";

const DrawManager = () => {
  const [option, setOption] = useState("Brush");
  let drawType = <Brush />;
  const handleChange = e => {
    const newOption = e.target.value;
    setOption(newOption);
  };
  if (option === "Rubber") {
    drawType = <Rubber />;
  } else if (option === "Line") {
    drawType = <Line />;
  }
  return (
    <div className="drawmanager">
      <select name="draw" id="draw" onChange={handleChange} value={option}>
        <option>Brush</option>
        <option>Rubber</option>
        <option>Line</option>
      </select>
      {drawType}
    </div>
  );
};

export default DrawManager;
