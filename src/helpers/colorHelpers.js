export const rgbToHex = (r, g, b) => {
    const hexR = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
    const hexG = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
    const hexB = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);

    return "#" + hexR + hexG + hexB;
};

export const hexToRgb = (hex) => {    
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};