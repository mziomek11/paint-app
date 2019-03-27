import React, {useState} from "react";
import Brush from "../tools/Brush";
import Rubber from "../tools/Rubber";
import Line from "../tools/Line";
import Ellipse from "../tools/Ellipse";
import Rect from "../tools/Rect";
import Fill from "../tools/Fill";
import Picker from "../tools/Picker";

const DrawManager = () => {
    const [option, setOption] = useState("Picker");
    let drawType;
    if(option === "Brush"){
        drawType = <Brush/>
    }else if(option === "Rubber"){
        drawType = <Rubber/>
    }else if(option === "Line"){
        drawType = <Line/>
    }else if(option === "Ellipse"){
        drawType = <Ellipse/>
    }else if(option === "Rect"){
        drawType = <Rect/>
    }else if(option === "Fill"){
        drawType = <Fill/>
    }else if(option === "Picker"){
        drawType = <Picker/>
    }
    const handleChange = e => {
        const newOption = e.target.value;
        setOption(newOption);
    }
    return(
        <div className="drawmanager">
            <select name="draw" id="draw" onChange={handleChange} value={option}>
                <option>Brush</option>
                <option>Rubber</option>
                <option>Line</option>
                <option>Ellipse</option>
                <option>Rect</option>
                <option>Fill</option>
                <option>Picker</option>
            </select>
            {drawType}
        </div>
    )
}

export default DrawManager;