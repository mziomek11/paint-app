import { Component } from "react";
import { connect } from "react-redux";

import settings from "../../settings";
import { fillCircle, drawLine } from "../../helpers/canvasHelpers";

class Brush extends Component {
  lastX = null;
  lastY = null;
  mousePressing = false;

  onMouseDown = e => {
    const { ctx, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;

    fillCircle(x, y, size, ctx);
    this.lastX = x;
    this.lastY = y;
    this.mousePressing = true;
  };

  onMouseUp = () => {
    this.lastX = null;
    this.lastY = null;
    this.mousePressing = false;
  };

  onMouseMove = e => {
    if (!this.mousePressing) return;
    const { ctx, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;

    drawLine(this.lastX, this.lastY, x, y, size, ctx);
    fillCircle(x, y, size, ctx);
    this.lastX = x;
    this.lastY = y;
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
  size: state.paint.size
});

export default connect(mapStateToProps)(Brush);
