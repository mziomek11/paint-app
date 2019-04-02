import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateTextArea} from "../store/actions/paintActions";

const TextArea = ({updateTextArea, color}) => {
    let textArea = React.createRef();
    useEffect(() => {
        updateTextArea(textArea.current);
    }, [])
    useEffect(() => {
        textArea.current.style.color = color;
    }, [color])
    return (
        <textarea className="oncanvas" ref={textArea}></textarea>
    )
}

const mapStateToProps = state => {
    return {
        color: state.paint.color
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTextArea: textArea => dispatch(updateTextArea(textArea))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);