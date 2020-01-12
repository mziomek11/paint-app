import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateTextArea } from "../store/actions/paintActions";

const TextArea = ({ updateTextArea, color }) => {
  let textArea = React.createRef();
  useEffect(() => {
    updateTextArea(textArea.current);
  }, []);

  return (
    <textarea className="oncanvas" style={{ color }} ref={textArea}></textarea>
  );
};

const mapStateToProps = state => ({
  color: state.paint.color
});

const mapDispatchToProps = dispatch => ({
  updateTextArea: textArea => dispatch(updateTextArea(textArea))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
