import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearCtx, strokeRect} from "../../helpers/canvasHelpers";

const Rect = ({ctx2, ctx, canvas2, size, settingsHeight}) => {
    useEffect(() => {
        if(!canvas2) return;
        const rect = document.getElementById("rect");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            rect.classList.add("pressing");
            rect.attributes.startx = x;
            rect.attributes.starty = y;
        }
        const onMouseUp = e => {
            const x = e.clientX;
            const y = e.clientY;
            const {startx, starty} = rect.attributes;
            clearCtx(ctx2);
            strokeRect(startx, starty - settingsHeight, x, y - settingsHeight, size, ctx);
            rect.classList.remove("pressing");
        }
        const onMouseMove = e => {
            if(!rect.classList.contains("pressing")) return;
            const x = e.clientX;
            const y = e.clientY;
            const {startx, starty} = rect.attributes;
            clearCtx(ctx2);
            strokeRect(startx, starty - settingsHeight, x, y - settingsHeight, size, ctx2);
        }
        canvas2.addEventListener("mousedown" , onMouseDown);
        canvas2.addEventListener("mouseup" , onMouseUp);
        canvas2.addEventListener("mousemove" , onMouseMove);
        return () => {
            canvas2.removeEventListener("mousedown" , onMouseDown);
            canvas2.removeEventListener("mouseup" , onMouseUp);
            canvas2.removeEventListener("mousemove" , onMouseMove);
        }
    }, [ctx2, canvas2, size])

    return(
        <div className="tool" id="rect">
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

export default connect(mapStateToProps)(Rect);