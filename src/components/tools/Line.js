import { Component } from "react";
import { connect } from "react-redux";

import settings from "../../settings";
import { clearCtx, drawRoundedLine } from "../../helpers/canvasHelpers";

class Line extends Component {
  startX = null;
  startY = null;
  mousePressing = false;

  onMouseDown = e => {
    const x = e.clientX;
    const y = e.clientY - settings.height;

    this.startX = x;
    this.startY = y;
    this.mousePressing = true;
  };

  onMouseUp = e => {
    const { ctx, ctx2, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;
    clearCtx(ctx2);
    drawRoundedLine(this.startX, this.startY, x, y, size, ctx);
    this.mousePressing = false;
  };

  onMouseMove = e => {
    if (!this.mousePressing) return;
    const { ctx2, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;
    clearCtx(ctx2);
    drawRoundedLine(this.startX, this.startY, x, y, size, ctx2);
  };

  addListeners = () => {
    window.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);
  };

  removeListeners = () => {
    window.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  ctx: state.paint.ctx,
  ctx2: state.paint.ctx2,
  size: state.paint.size
});

export default connect(mapStateToProps)(Line);
