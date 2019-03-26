import React from "react";
import Size from "./Size";
import Color from "./Color";
import Clear from "./Clear";
import DrawManager from "./DrawManager";
import "../../css/settings/settings.css";

const Settings = () => {
    return (
        <div className="settings">
            <Size/>
            <Color/>
            <Clear/>
            <DrawManager/>
        </div>
    )
}

export default Settings;