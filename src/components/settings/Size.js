import React, {useState} from "react";
import {connect} from "react-redux";
import {updateSize} from "../../store/actions/paintActions";

const Size = ({updateSize}) => {
    const [size, setSize] = useState(10);
    const handleSlide = (e) => {
        const newSize = e.target.value;
        setSize(newSize);
        updateSize(newSize);
    }
    return(
        <div className="size">
            <input type="range" min="1" max="100" onChange={handleSlide} value={size}/>
        </div>
    )
}

const mapDispatchToPros = dispatch => {
    return {
        updateSize: size => dispatch(updateSize(size))
    }
}

export default connect(null, mapDispatchToPros)(Size);