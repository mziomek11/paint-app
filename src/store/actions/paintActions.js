import { PaintActions } from "./ActionTypes";

export const updateCanvas = (canvas, isFirst) => ({
  type: PaintActions.UPDATE_CANVAS,
  payload: { canvas, isFirst }
});

export const updateCtx = (ctx, isFirst) => {
  if (isFirst) {
    const { width, height } = ctx.canvas;
    const lastColor = ctx.fillStyle;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = lastColor;
  }

  return {
    type: PaintActions.UPDATE_CTX,
    payload: { ctx, isFirst }
  };
};

export const updateSize = size => ({
  type: PaintActions.UPDATE_SIZE,
  payload: size
});

export const updateColor = color => ({
  type: PaintActions.UPDATE_COLOR,
  payload: color
});

export const updateTextArea = textArea => ({
  type: PaintActions.UPDATE_TEXT_AREA,
  payload: textArea
});
