import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearCtx, fillRect, drawLine} from "../../helpers/canvasHelpers";

const Rubber = ({ctx, ctx2, canvas2, size, settingsHeight}) => {
    useEffect(() => {
        if(!canvas2) return;
        const rubber = document.getElementById("rubber");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            fillRect(x, y - settingsHeight, size, ctx);
            rubber.classList.add("pressing");
            rubber.attributes.lastx = x;
            rubber.attributes.lasty = y;
        }
        const onMouseUp = () => {
            rubber.classList.remove("pressing");
            rubber.attributes.lastx = null;
            rubber.attributes.lasty = null;
        }
        const onMouseMove = e => {
            const x = e.clientX;
            const y = e.clientY;
            clearCtx(ctx2);
            fillRect(x, y - settingsHeight, size, ctx2);
            if(!rubber.classList.contains("pressing")) return;
            const {lastx, lasty} = rubber.attributes;
            if(lastx && lasty) {
                drawLine(lastx, lasty - settingsHeight, x, y - settingsHeight, size, ctx);
            }
            rubber.attributes.lastx = x;
            rubber.attributes.lasty = y;
            fillRect(x, y - settingsHeight, size, ctx);
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
        <div className="tool" id="rubber">
 
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

export default connect(mapStateToProps)(Rubber);