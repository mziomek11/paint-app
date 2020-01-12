import React, { useEffect } from "react";
import { connect } from "react-redux";

import settings from "../settings";
import { updateCanvas, updateCtx } from "../store/actions/paintActions";

const Canvas = ({ updateCanvas, updateCtx, isFirst }) => {
  let canvas = React.createRef();
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    updateCanvas(canvas.current, isFirst);
    updateCtx(ctx, isFirst);

    window.addEventListener("resize", handleResize(canvas.current));
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = canvas => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - settings.height;
  };

  return (
    <canvas
      ref={canvas}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  updateCanvas: (canvas, isFirst) => dispatch(updateCanvas(canvas, isFirst)),
  updateCtx: (ctx, isFirst) => dispatch(updateCtx(ctx, isFirst))
});

export default connect(null, mapDispatchToProps)(Canvas);
