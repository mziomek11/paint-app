import React from "react";
import Canvas from "./components/Canvas"
import Settings from "./components/settings/Settings";
import "./css/main/main.css";

const App = () => {
  return (
    <div className="app">
      <Settings/>
      <Canvas isFirst={false}/>
      <Canvas isFirst={true}/>
    </div>
  )
}
export default App;
