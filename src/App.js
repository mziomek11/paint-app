import React from "react";
import Canvas from "./components/Canvas"
import Settings from "./components/settings/Settings";
import "./css/main/main.css";

const App = () => {
  return (
    <div className="app">
      <Settings/>
      <Canvas isFirst={true}/>
      <Canvas isFirst={false}/>
    </div>
  )
}
export default App;
