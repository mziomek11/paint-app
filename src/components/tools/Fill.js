import React, { useEffect } from "react";
import { connect } from "react-redux";
import { rgbToHex, hexToRgb } from "../../helpers/colorHelpers";

const Fill = ({ ctx, canvas2, settingsHeight }) => {
  useEffect(() => {
    if (!canvas2) return;
    const onMouseDown = e => {
      const { width, height } = ctx.canvas;
      const canvasClickX = e.clientX;
      const canvasClickY = e.clientY - settingsHeight;
      const image = ctx.getImageData(0, 0, width, height);
      const pixels = image.data;
      const pos = 4 * (width * canvasClickY + canvasClickX);
      const targetHex = rgbToHex(pixels[pos], pixels[pos + 1], pixels[pos + 2]);
      const [targetR, targetG, targetB] = [
        pixels[pos],
        pixels[pos + 1],
        pixels[pos + 2]
      ];
      const { r, g, b } = hexToRgb(ctx.fillStyle);

      const equalsTargetColor = (pixel, addStart) => {
        return (
          pixels[pixel + addStart] === targetR &&
          pixels[pixel + addStart + 1] === targetG &&
          pixels[pixel + addStart + 2] === targetB
        );
      };
      const findMaxLeftTargetPixel = pos => {
        const y = Math.floor(pos / (4 * width));
        const endLeft = y * width * 4;
        let left = pos;
        while (endLeft < left) {
          if (equalsTargetColor(left, -4)) {
            left -= 4;
          } else break;
        }
        return left;
      };
      const findMaxRightTargetPixel = pos => {
        const y = Math.floor(pos / (4 * width));
        const endRight = (y + 1) * width * 4 - 4;
        let right = pos;
        while (right < endRight) {
          if (equalsTargetColor(right, 4)) {
            right += 4;
          } else break;
        }
        return right;
      };
      if (ctx.fillStyle !== targetHex) {
        let Q = [pos];
        while (Q.length > 0) {
          const chkdPos = Q.shift();
          if (!equalsTargetColor(chkdPos, 0)) continue;

          const left = findMaxLeftTargetPixel(chkdPos);
          const right = findMaxRightTargetPixel(chkdPos);
          for (let i = left; i <= right; i += 4) {
            pixels[i] = r;
            pixels[i + 1] = g;
            pixels[i + 2] = b;

            const top = i - 4 * width;
            const bottom = i + 4 * width;

            if (top >= 0 && equalsTargetColor(top, 0)) {
              Q.push(top);
            }
            if (bottom < pixels.length && equalsTargetColor(bottom, 0)) {
              Q.push(bottom);
            }
          }
        }
      }
      ctx.putImageData(image, 0, 0);
    };
    canvas2.addEventListener("mousedown", onMouseDown);
    return () => {
      canvas2.removeEventListener("mousedown", onMouseDown);
    };
  }, [ctx, canvas2]);

  return <div className="tool" id="fill"></div>;
};

const mapStateToProps = state => {
  return {
    ctx: state.paint.ctx,
    canvas2: state.paint.canvas2,
    settingsHeight: state.paint.settingsHeight
  };
};

export default connect(mapStateToProps)(Fill);
