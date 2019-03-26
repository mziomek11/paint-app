import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateCanvas, updateCtx} from "../store/actions/paintActions";

const Canvas = ({updateCanvas, updateCtx, isFirst}) => {
    useEffect(() => {
        const canvas = document.getElementById(isFirst ? "canv" : "canv2");
        const ctx = canvas.getContext('2d');
        updateCanvas(canvas, isFirst);
        updateCtx(ctx, isFirst);
    }, [])
    return (
        <canvas id={isFirst ? "canv" : "canv2"} width={window.innerWidth} height={window.innerHeight}/>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateCanvas: (canvas, isFirst) => dispatch(updateCanvas(canvas, isFirst)),
        updateCtx: (ctx, isFirst) => dispatch(updateCtx(ctx, isFirst))
    }
}

export default connect(null, mapDispatchToProps)(Canvas);