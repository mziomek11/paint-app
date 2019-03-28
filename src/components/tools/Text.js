import React, {useEffect} from "react";
import {connect} from "react-redux";
import {clearCtx, strokeTextBorder, fillText} from "../../helpers/canvasHelpers";

const Text = ({ctx, ctx2, canvas2, settingsHeight}) => {
    useEffect(() => {
        if(!canvas2) return;
        const text = document.getElementById("text");
        const onMouseDown = e => {
            const x = e.clientX;
            const y = e.clientY;
            if(!text.classList.contains("typing")){
                text.attributes.startx = x;
                text.attributes.starty = y;
                text.classList.add("pressing");
            }else {
                const {startx, starty, endx, endy} = text.attributes;
                if(clickedOnBox(x, y, startx, starty, endx, endy)){
                    console.log("box");
                }else {
                    clearCtx(ctx2);
                    if(text.attributes.typed){
                        fillText(Math.min(startx, endx), Math.min(starty, endy) - settingsHeight + 30, text.attributes.typed, ctx);
                        text.attributes.typed = undefined;
                    }
                    text.classList.remove("typing");
                }
            }
        }

        const onMouseUp = e => {
            if(!text.classList.contains("pressing")) return;
            const x = e.clientX;
            const y = e.clientY;
            text.attributes.endx = x;
            text.attributes.endy = y;
            text.classList.remove("pressing");
            if(!(x === text.attributes.startx && y === text.attributes.starty)){
                text.classList.add("typing");
            }
        }

        const onMouseMove = e => {
            if(!text.classList.contains("pressing")) return;
            const x = e.clientX;
            const y = e.clientY;
            const {startx, starty} = text.attributes;
            clearCtx(ctx2);
            strokeTextBorder(startx, starty - settingsHeight, x, y - settingsHeight, ctx2);
        }

        const onKeyDown = (e) => {
            if(!text.classList.contains("typing")) return;
            if(e.key.length > 1 && e.key !== "Backspace") return;
            const {startx, starty, endx, endy, typed} = text.attributes;
            if(e.key.length === 1){
                if(typed){
                    text.attributes.typed += e.key;
                }else {
                    text.attributes.typed = e.key;
                }
            } else if(e.key === "Backspace"){
                if(typed){
                    if(typed.length > 0){
                        text.attributes.typed =typed.substring(0, typed.length - 1);
                    }
                }
            }

            if(text.attributes.typed !== undefined){
                clearCtx(ctx2);
                strokeTextBorder(startx, starty - settingsHeight, endx, endy - settingsHeight, ctx2);
                fillText(Math.min(startx, endx), Math.min(starty, endy) - settingsHeight + 30, text.attributes.typed, ctx2);
            }
        }

        canvas2.addEventListener("mousedown" , onMouseDown);
        canvas2.addEventListener("mouseup" , onMouseUp);
        canvas2.addEventListener("mousemove" , onMouseMove);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            canvas2.removeEventListener("mousedown" , onMouseDown);
            canvas2.removeEventListener("mouseup" , onMouseUp);
            canvas2.removeEventListener("mousemove" , onMouseMove);
            window.removeEventListener("keydown", onKeyDown);
        }
    }, [ctx, ctx2, canvas2])

    const clickedOnBox = (x, y, startx, starty, endx, endy) => {
        const xOk = x >= Math.min(startx, endx) && x <= Math.max(startx, endx);
        const yOk = y >= Math.min(starty, endy) && y <= Math.max(starty, endy); 
        return xOk && yOk;
    }

    return(
        <div className="tool" id="text">
 
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

export default connect(mapStateToProps)(Text);