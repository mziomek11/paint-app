import React, {useState} from "react";
import Brush from "../tools/Brush";
import Rubber from "../tools/Rubber";
import Line from "../tools/Line";
import Ellipse from "../tools/Ellipse";
import Rect from "../tools/Rect";
import Fill from "../tools/Fill";
import Picker from "../tools/Picker";
import Text from "../tools/Text";

const DrawManager = () => {
    let select = React.createRef();
    const [tool, setTool] = useState(<Brush/>);
    const handleToolClick = (e, newTool) => {
        setTool(newTool);
        select.current.childNodes.forEach(node => node.classList.remove("selected"));
        e.currentTarget.classList.add("selected");
    }
    return(
        <div className="tool-maganer">
            <div className="tool-select" ref={select}>
                <div className="tool-option selected" onClick={e => handleToolClick(e, <Brush/>)}>
                    <i className="fas fa-paint-brush"></i>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Rubber/>)}>
                    <i className="fas fa-eraser"></i>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Line/>)}>
                    <div className="line"></div>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Ellipse/>)}>
                    <i className="far fa-circle"></i>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Rect/>)}>
                    <div className="rect"></div>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Fill/>)}>
                    <i className="fas fa-fill-drip"></i>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Picker/>)}>
                    <i className="fas fa-eye-dropper"></i>
                </div>
                <div className="tool-option" onClick={e => handleToolClick(e, <Text/>)}>
                    <i className="fab fa-amilia"></i>
                </div>
            </div>
            {tool}
        </div>
    )
}

export default DrawManager;