import React from "react";
import {connect} from "react-redux";

const Clear = ({ctx}) => {
    const handleClearClick = e => {
        const {width, height} = ctx.canvas;
        const lastColor = ctx.fillStyle;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = lastColor;
    } 
    return (
        <div className="clear">
            <button onClick={handleClearClick}>Clear</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx
    }
}

export default connect(mapStateToProps)(Clear);