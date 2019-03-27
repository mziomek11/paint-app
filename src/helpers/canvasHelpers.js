export const clearCtx = ctx => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const strokeRect = (startX, startY, endX, endY, size, ctx) => {
    const width = endX - startX;
    const height = endY - startY;

    ctx.lineWidth = size;
    ctx.strokeRect(startX, startY, width, height);  
}

export const fillRect = (x, y, size, ctx) => {
    ctx.fillRect(x - size/2, y - size/2, size, size);
};

export const fillCircle = (x, y, size, ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2*Math.PI);
    ctx.fill();
};

export const strokeEllipse = (startX, startY, endX, endY, size, ctx) => {
    const centerX = (endX + startX) / 2;
    const centerY = (endY + startY) / 2;
    const radiusX = Math.abs(endY - startY) / 2;
    const radiusY = Math.abs(endX - startX) / 2;
    
    if(radiusX >= size/2 && radiusY >= size/2){
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI / 2, 0, 2 * Math.PI);
        ctx.stroke();  
    }     
}

export const drawLine = (startX, startY, endX, endY, size, ctx) => {
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};

export const drawRoundedLine = (startX, startY, endX, endY, size, ctx) => {
    fillCircle(startX, startY, size, ctx);
    drawLine(startX, startY, endX, endY, size, ctx);
    fillCircle(endX, endY, size, ctx);
};
