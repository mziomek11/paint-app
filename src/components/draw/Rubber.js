import React, {useEffect} from "react";
import {connect} from "react-redux";

const Rubber = ({ctx, canvas, size, settingsHeight}) => {
    useEffect(() => {
        if(!canvas) return;
        const rubber = document.getElementById("rubber");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            drawRect(x, y);
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
            if(!rubber.classList.contains("pressing")) return;
            const x = e.clientX;
            const y = e.clientY;
            const {lastx, lasty} = rubber.attributes;
            if(lastx && lasty) {
                drawLine(lastx, lasty, x, y);
            }
            rubber.attributes.lastx = x;
            rubber.attributes.lasty = y;
            drawRect(x, y);
        }
        canvas.addEventListener("mousedown" , onMouseDown);
        canvas.addEventListener("mouseup" , onMouseUp);
        canvas.addEventListener("mousemove" , onMouseMove);
        return () => {
            canvas.removeEventListener("mousedown" , onMouseDown);
            canvas.removeEventListener("mouseup" , onMouseUp);
            canvas.removeEventListener("mousemove" , onMouseMove);
        }
    }, [ctx, canvas, size])

    const drawRect = (x, y) => {
        ctx.fillRect(x - size/2, y - size/2 - settingsHeight, size, size);
    }

    const drawLine = (startX, startY, endX, endY) => {
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(startX, startY - settingsHeight);
        ctx.lineTo(endX, endY - settingsHeight);
        ctx.stroke();
    }

    return(
        <div className="draw rubber" id="rubber">
 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx,
        size: state.paint.size,
        canvas: state.paint.canvas,
        settingsHeight: state.paint.settingsHeight
    }
}

export default connect(mapStateToProps)(Rubber);