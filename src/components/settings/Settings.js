import React from "react";
import Size from "./Size";
import Color from "./Color";
import Clear from "./Clear";
import ToolManager from "./ToolManager";
import "../../css/settings/settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <ToolManager />
      <Size />
      <Color />
      <Clear />
    </div>
  );
};

export default Settings;
