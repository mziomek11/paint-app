import React, {Component} from "react";
import {connect} from "react-redux";
import {clearCtx, strokeTextBorder, fillText} from "../../helpers/canvasHelpers";

class Text extends Component{
    state = {
        startX: null,
        startY: null,
        endX: null,
        endY: null,
        typing: false,
        pressing: false,
        text: ""
    }
    onMouseDown = e => {
        const {settingsHeight, ctx, ctx2} = this.props;
        const {typing, startX, startY, endX, endY, text} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;
        if(!typing){
            this.setState({startX: x, startY: y, pressing: true});
        }else {
            if(this.clickedOnBox(x, y, startX, startY, endX, endY)){
                console.log("box");
            }else {
                clearCtx(ctx2);
                fillText(Math.min(startX, endX), Math.min(startY, endY) + 30, text, ctx);
                this.setState({text: "", pressing: false, typing: false});
            }
        }
    }
    onMouseUp = e => {
        if(!this.state.pressing) return;
        const {settingsHeight} = this.props;
        const {startX, startY} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;
        this.setState({endX: x, endY: y, pressing: false});
        if(!(x === startX && y === startY)){
            this.setState({typing: true});
        }
    }
    onMouseMove = e => {
        if(!this.state.pressing) return;
        const {settingsHeight, ctx2} = this.props;
        const {startX, startY} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;

        clearCtx(ctx2);
        strokeTextBorder(startX, startY, x, y, ctx2);
    }
    onKeyDown = e => {
        if(!this.state.typing) return;
        if(e.key.length > 1 && e.key !== "Backspace") return;
        const {ctx2} = this.props;
        const {startX, startY, endX, endY, text} = this.state;
        let newText = "";
        if(e.key.length === 1){
            newText = text + e.key;
            this.setState({text: newText})
        }else if(e.key === "Backspace" && text.length > 0){
            newText = text.substring(0, text.length - 1);
            this.setState({text: newText})
        }

        clearCtx(ctx2);
        strokeTextBorder(startX, startY, endX, endY, ctx2);
        fillText(Math.min(startX, endX), Math.min(startY, endY) + 30, newText, ctx2);
    }
    clickedOnBox = (x, y, startx, starty, endx, endy) => {
        const xOk = x >= Math.min(startx, endx) && x <= Math.max(startx, endx);
        const yOk = y >= Math.min(starty, endy) && y <= Math.max(starty, endy); 
        return xOk && yOk;
    }
    addListeners = () => {
        const {canvas2} = this.props;
        if(!canvas2) return;
        canvas2.addEventListener("mousedown" , this.onMouseDown);
        canvas2.addEventListener("mouseup" , this.onMouseUp);
        canvas2.addEventListener("mousemove" , this.onMouseMove);
        window.addEventListener("keydown", this.onKeyDown);
    }
    removeListeners = () => {
        const {canvas2} = this.props;
        if(!canvas2) return;
        canvas2.removeEventListener("mousedown" , this.onMouseDown);
        canvas2.removeEventListener("mouseup" , this.onMouseUp);
        canvas2.removeEventListener("mousemove" , this.onMouseMove);
        window.removeEventListener("keydown", this.onKeyDown);
    }
    componentDidMount(){
        this.addListeners();
    }
    componentDidUpdate(){
        this.addListeners();
    }
    componentWillUpdate(){
        this.removeListeners();
    }
    componentWillUnmount(){
        this.removeListeners();
    }
    render(){
        return(
            <div className="tool" id="text"/>
        )
    }
} 

// const Text = ({ctx, ctx2, canvas2, settingsHeight}) => {
//     let text = React.createRef();
//     useEffect(() => {
//         if(!canvas2) return;
//         const onMouseDown = e => {
//             const x = e.clientX;
//             const y = e.clientY;
//             if(!text.current.classList.contains("typing")){
//                 text.current.attributes.startx = x;
//                 text.current.attributes.starty = y;
//                 text.current.classList.add("pressing");
//             }else {
//                 const {startx, starty, endx, endy} = text.current.attributes;
//                 if(clickedOnBox(x, y, startx, starty, endx, endy)){
//                     console.log("box");
//                 }else {
//                     clearCtx(ctx2);
//                     if(text.current.attributes.typed){
//                         fillText(Math.min(startx, endx), Math.min(starty, endy) - settingsHeight + 30, text.current.attributes.typed, ctx);
//                         text.current.attributes.typed = undefined;
//                     }
//                     text.current.classList.remove("typing");
//                 }
//             }
//         }

//         const onMouseUp = e => {
//             if(!text.current.classList.contains("pressing")) return;
//             const x = e.clientX;
//             const y = e.clientY;
//             text.current.attributes.endx = x;
//             text.current.attributes.endy = y;
//             text.current.classList.remove("pressing");
//             if(!(x === text.current.attributes.startx && y === text.current.attributes.starty)){
//                 text.current.classList.add("typing");
//             }
//         }

//         const onMouseMove = e => {
//             if(!text.current.classList.contains("pressing")) return;
//             const x = e.clientX;
//             const y = e.clientY;
//             const {startx, starty} = text.current.attributes;
//             clearCtx(ctx2);
//             strokeTextBorder(startx, starty - settingsHeight, x, y - settingsHeight, ctx2);
//         }

//         const onKeyDown = (e) => {
//             if(!text.current.classList.contains("typing")) return;
//             if(e.key.length > 1 && e.key !== "Backspace") return;
//             const {startx, starty, endx, endy, typed} = text.current.attributes;
//             if(e.key.length === 1){
//                 if(typed){
//                     text.current.attributes.typed += e.key;
//                 }else {
//                     text.current.attributes.typed = e.key;
//                 }
//             } else if(e.key === "Backspace"){
//                 if(typed){
//                     if(typed.length > 0){
//                         text.current.attributes.typed =typed.substring(0, typed.length - 1);
//                     }
//                 }
//             }

//             if(text.current.attributes.typed !== undefined){
//                 clearCtx(ctx2);
//                 strokeTextBorder(startx, starty - settingsHeight, endx, endy - settingsHeight, ctx2);
//                 fillText(Math.min(startx, endx), Math.min(starty, endy) - settingsHeight + 30, text.current.attributes.typed, ctx2);
//             }
//         }

//         canvas2.addEventListener("mousedown" , onMouseDown);
//         canvas2.addEventListener("mouseup" , onMouseUp);
//         canvas2.addEventListener("mousemove" , onMouseMove);
//         window.addEventListener("keydown", onKeyDown);
//         return () => {
//             canvas2.removeEventListener("mousedown" , onMouseDown);
//             canvas2.removeEventListener("mouseup" , onMouseUp);
//             canvas2.removeEventListener("mousemove" , onMouseMove);
//             window.removeEventListener("keydown", onKeyDown);
//         }
//     }, [ctx, ctx2, canvas2])

//     const clickedOnBox = (x, y, startx, starty, endx, endy) => {
//         const xOk = x >= Math.min(startx, endx) && x <= Math.max(startx, endx);
//         const yOk = y >= Math.min(starty, endy) && y <= Math.max(starty, endy); 
//         return xOk && yOk;
//     }

//     return(
//         <div className="tool" id="text" ref={text}>
 
//         </div>
//     )
// }

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