import React, {useEffect} from "react";
import {connect} from "react-redux";

const Color = ({ctx}) => {
    const startColor = "#000000";
    useEffect(() => {
        document.getElementById("colorpicker").value = startColor;
    }, [])
    const handleColorChange = e => {
        ctx.fillStyle = e.target.value;
        ctx.strokeStyle = e.target.value;
    } 
    return (
        <input type="color" onChange={handleColorChange} id="colorpicker"/>
    )
}

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx
    }
}

export default connect(mapStateToProps)(Color);