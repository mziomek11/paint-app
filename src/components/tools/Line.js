import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearCtx, drawRoundedLine} from "../../helpers/canvasHelpers";

const Line = ({ctx2, ctx, canvas2, size, settingsHeight}) => {
    useEffect(() => {
        if(!canvas2) return;
        const line = document.getElementById("line");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            line.attributes.startx = x;
            line.attributes.starty = y;
            line.classList.add("pressing");
        }
        const onMouseUp = e => {
            const x = e.clientX;
            const y = e.clientY;
            const {startx, starty} = line.attributes;
            clearCtx(ctx2);
            drawRoundedLine(startx, starty - settingsHeight, x, y - settingsHeight, size, ctx);
            line.classList.remove("pressing");
        }
        const onMouseMove = e => {
            if(!line.classList.contains("pressing")) return;
            const x = e.clientX;
            const y = e.clientY;
            const {startx, starty} = line.attributes;
            clearCtx(ctx2);
            drawRoundedLine(startx, starty - settingsHeight, x, y - settingsHeight, size, ctx2);
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
        <div className="tool" id="line">
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

export default connect(mapStateToProps)(Line);