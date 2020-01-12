import { Component } from "react";
import { connect } from "react-redux";

import settings from "../../settings";
import { fillRect, drawLine } from "../../helpers/canvasHelpers";

class Rubber extends Component {
  lastX = null;
  lastY = null;
  mousePressing = false;

  onMouseDown = e => {
    const { ctx, size } = this.props;
    const x = e.clientX;
    const y = e.clientY - settings.height;

    fillRect(x, y, size, ctx);
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
    fillRect(x, y, size, ctx);
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
  ctx2: state.paint.ctx2,
  size: state.paint.size
});

export default connect(mapStateToProps)(Rubber);
