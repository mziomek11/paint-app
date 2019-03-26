import {PaintActions} from "./ActionTypes";

export const updateCanvas = (canvas, isFirst) => {
    return {
        type: PaintActions.UPDATE_CANVAS, 
        payload: {canvas, isFirst}
    };
};

export const updateCtx = (ctx, isFirst) => {
    return {
        type: PaintActions.UPDATE_CTX,
        payload: {ctx, isFirst}
    };
};

export const updateSize = size => {
    return {
        type: PaintActions.UPDATE_SIZE,
        payload: size
    };
};