import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearCtx, fillCircle, drawLine} from "../../helpers/canvasHelpers";

const Brush = ({ctx, ctx2, canvas2, size, settingsHeight}) => {
    useEffect(() => {
        if(!canvas2) return;
        const brush = document.getElementById("brush");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            clearCtx(ctx2);
            fillCircle(x, y - settingsHeight, size, ctx);
            brush.classList.add("pressing");
            brush.attributes.lastx = x;
            brush.attributes.lasty = y;
        }
        const onMouseUp = () => {
            brush.classList.remove("pressing");
            brush.attributes.lastx = null;
            brush.attributes.lasty = null;
        }
        const onMouseMove = e => {
            const x = e.clientX;
            const y = e.clientY;
            clearCtx(ctx2);
            fillCircle(x, y - settingsHeight, size, ctx2);
            if(!brush.classList.contains("pressing")) return;
            const {lastx, lasty} = brush.attributes;
            if(lastx && lasty) {
                drawLine(lastx, lasty - settingsHeight, x, y - settingsHeight, size, ctx);
            }
            brush.attributes.lastx = x;
            brush.attributes.lasty = y;
            fillCircle(x, y - settingsHeight, size, ctx);
        }
        canvas2.addEventListener("mousedown" , onMouseDown);
        canvas2.addEventListener("mouseup" , onMouseUp);
        canvas2.addEventListener("mousemove" , onMouseMove);
        canvas2.classList.add("no-cursor");
        return () => {
            canvas2.removeEventListener("mousedown" , onMouseDown);
            canvas2.removeEventListener("mouseup" , onMouseUp);
            canvas2.removeEventListener("mousemove" , onMouseMove);
            canvas2.classList.remove("no-cursor");
            clearCtx(ctx2);
        }
    }, [ctx, ctx2, canvas2, size])

    return(
        <div className="tool brush" id="brush">
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx,
        ctx2: state.paint.ctx2,
        size: state.paint.size,
        canvas2: state.paint.canvas2,
        settingsHeight: state.paint.settingsHeight
    }
}

export default connect(mapStateToProps)(Brush);