import React, {Component} from "react";
import {connect} from "react-redux";
import {fillRect, drawLine} from "../../helpers/canvasHelpers";

class Rubber extends Component{
    state = {
        lastX: null,
        lastY: null,
        mousePressing: false
    }
    onMouseDown = e => {
        const {settingsHeight, ctx, size} = this.props;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;

        fillRect(x, y, size, ctx);
        this.setState({lastX: x, lastY: y, mousePressing: true});
    }
    onMouseUp = () => {
        this.setState({lastX: null, lastY: null, mousePressing: false});
    }
    onMouseMove = e => {
        if(!this.state.mousePressing) return;
        const {settingsHeight, ctx, size} = this.props;
        const {lastX, lastY} = this.state;
        const x = e.clientX;
        const y = e.clientY - settingsHeight;

        drawLine(lastX, lastY, x, y, size, ctx);
        fillRect(x, y, size, ctx);
        this.setState({lastX: x, lastY: y});
    }
    addListeners = () => {
        const {canvas2} = this.props;
        if(!canvas2) return;
        canvas2.addEventListener("mousedown" , this.onMouseDown);
        canvas2.addEventListener("mouseup" , this.onMouseUp);
        canvas2.addEventListener("mousemove" , this.onMouseMove);
    }
    removeListeners = () => {
        const {canvas2} = this.props;
        if(!canvas2) return;
        canvas2.removeEventListener("mousedown" , this.onMouseDown);
        canvas2.removeEventListener("mouseup" , this.onMouseUp);
        canvas2.removeEventListener("mousemove" , this.onMouseMove);
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
            <div className="tool" id="brush"/>
        )
    }
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