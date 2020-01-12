import React, { useEffect } from "react";
import { connect } from "react-redux";

const Clear = ({ ctx, ctx2 }) => {
  useEffect(() => {
    if (ctx) handleClearClick();
  }, [ctx]);
  const handleClearClick = e => {
    const { width, height } = ctx.canvas;
    const lastColor = ctx.fillStyle;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx2.clearRect(0, 0, width, height);
    ctx.fillStyle = lastColor;
  };
  return (
    <div className="clear">
      <button onClick={handleClearClick}>Clear</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ctx: state.paint.ctx,
    ctx2: state.paint.ctx2
  };
};

export default connect(mapStateToProps)(Clear);
