import React, {useEffect} from "react";
import {connect} from "react-redux";

const Line = ({ctx, canvas, size, settingsHeight}) => {
    useEffect(() => {
        if(!canvas) return;
        const line = document.getElementById("line");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            drawCircle(x, y);
            line.classList.toggle("pressing");
            line.attributes.lastx = x;
            line.attributes.lasty = y;
        }
        const onMouseUp = () => {
            line.classList.remove("pressing");
            line.attributes.lastx = null;
            line.attributes.lasty = null;
        }
        const onMouseMove = e => {
            if(!line.classList.contains("pressing")) return;
            const x = e.clientX;
            const y = e.clientY;
            const {lastx, lasty} = line.attributes;
            if(lastx && lasty) {
                drawLine(lastx, lasty, x, y);
            }
            line.attributes.lastx = x;
            line.attributes.lasty = y;
            drawCircle(x, y);
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

    const drawCircle = (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y - settingsHeight, size / 2, 0, 2*Math.PI);
        ctx.fill();
    }

    const drawLine = (startX, startY, endX, endY) => {
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(startX, startY - settingsHeight);
        ctx.lineTo(endX, endY - settingsHeight);
        ctx.stroke();
    }

    return(
        <div className="draw line" id="line">
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

export default connect(mapStateToProps)(Line);