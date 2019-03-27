import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateColor} from "../../store/actions/paintActions";

const Picker = ({ctx, canvas2, settingsHeight, updateColor}) => {
    useEffect(() => {
        if(!canvas2) return;
        const onMouseDown = e => {
            const canvasClickX = e.clientX;
            const canvasClickY = e.clientY - settingsHeight;
            const imageData = ctx.getImageData(canvasClickX, canvasClickY, 1, 1).data;
            const rgbToHex = (r, g, b) => {
                const hexR = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
                const hexG = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
                const hexB = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);
        
                return "#" + hexR + hexG + hexB;
            }
            const colorRGB = rgbToHex(imageData[0], imageData[1], imageData[2]);
            console.log(colorRGB);
            updateColor(colorRGB);
        }
        canvas2.addEventListener("mousedown" , onMouseDown);
        return () => {
            canvas2.removeEventListener("mousedown" , onMouseDown);
        }
    }, [ctx, canvas2])

    return(
        <div className="tool picker" id="picker">
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ctx: state.paint.ctx,
        canvas2: state.paint.canvas2,
        settingsHeight: state.paint.settingsHeight
    }
}

const mapDispatchToProps = disptach => {
    return {
        updateColor: color => disptach(updateColor(color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Picker);