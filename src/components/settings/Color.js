import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateColor} from "../../store/actions/paintActions";

const Color = ({ctx, ctx2, color, updateColor}) => {
    useEffect(() => {
        document.getElementById("colorpicker").value = color;
    }, [color])
    const handleColorChange = e => {
        ctx.fillStyle = e.target.value;
        ctx.strokeStyle = e.target.value;
        ctx2.fillStyle = e.target.value;
        ctx2.strokeStyle = e.target.value;
        updateColor(e.target.value);
    } 
    return (
        <input type="color" onChange={handleColorChange} id="colorpicker"/>
    )
}

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx,
        ctx2: state.paint.ctx2,
        color: state.paint.color
    }
}

const mapDispatchToProps = disptach => {
    return {
        updateColor: color => disptach(updateColor(color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Color);