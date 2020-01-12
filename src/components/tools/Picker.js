import { useEffect } from "react";
import { connect } from "react-redux";

import settings from "../../settings";
import { updateColor } from "../../store/actions/paintActions";
import { rgbToHex } from "../../helpers/colorHelpers";

const Picker = ({ ctx, canvas2, updateColor }) => {
  useEffect(() => {
    if (canvas2) {
      canvas2.addEventListener("mousedown", onMouseDown);
      return () => canvas2.removeEventListener("mousedown", onMouseDown);
    }
  }, [canvas2]);

  const onMouseDown = e => {
    const canvasClickX = e.clientX;
    const canvasClickY = e.clientY - settings.height;
    const imageData = ctx.getImageData(canvasClickX, canvasClickY, 1, 1).data;
    const colorRGB = rgbToHex(imageData[0], imageData[1], imageData[2]);
    updateColor(colorRGB);
  };

  return null;
};

const mapStateToProps = state => ({
  ctx: state.paint.ctx,
  canvas2: state.paint.canvas2
});

const mapDispatchToProps = disptach => ({
  updateColor: color => disptach(updateColor(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
