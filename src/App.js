import React from "react";
import Canvas from "./components/Canvas";
import TextArea from "./components/TextArea";
import Settings from "./components/settings/Settings";
import "./css/main/main.css";

const App = () => {
  return (
    <div className="app">
      <Settings />
      <div className="canvas-container" id="canvas-container">
        <Canvas isFirst={true} />
        <Canvas isFirst={false} />
        <TextArea />
      </div>
    </div>
  );
};
export default App;
