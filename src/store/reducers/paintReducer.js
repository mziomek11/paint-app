import { PaintActions } from "../actions/constants";

const initState = {
  canvas: null,
  ctx: null,
  canvas2: null,
  ctx2: null,
  size: 10,
  color: "#000000",
  textArea: null
};

const paintReducer = (state = initState, action) => {
  switch (action.type) {
    case PaintActions.UPDATE_CANVAS:
      return {
        ...state,
        [action.payload.isFirst ? "canvas" : "canvas2"]: action.payload.canvas
      };
    case PaintActions.UPDATE_CTX:
      return {
        ...state,
        [action.payload.isFirst ? "ctx" : "ctx2"]: action.payload.ctx
      };
    case PaintActions.UPDATE_SIZE:
      return { ...state, size: action.payload };
    case PaintActions.UPDATE_COLOR:
      return { ...state, color: action.payload };
    case PaintActions.UPDATE_TEXT_AREA:
      return { ...state, textArea: action.payload };
    default:
      return state;
  }
};

export default paintReducer;
