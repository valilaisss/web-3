let img
let maskImage

function preload() {
    img = loadImage('assets/mask.png')
}

function setup() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    myCanvas = createCanvas(windowWidth, windowHeight)
    myCanvas.parent("#canvas-parent")
    maskLayer = createGraphics(windowWidth, windowHeight)
}

function draw() {
    maskLayer.clear();
    maskLayer.fill(255);
    
    maskLayer.circle(
        width * 0.2057,
        height * 0.2463,
        width * 0.2948
    );
    
    maskLayer.circle(
        width * 0.3125,
        height * 0.3704,
        width * 0.0260
    );
    
    maskLayer.circle(
        width * 0.5208,
        height * 0.9259,
        width * 0.1563
    );
    
    let circleWidth = width * 0.15;
    maskLayer.circle(mouseX, mouseY, circleWidth);
    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer);
    image(maskedImg, 0, 0, width, height);
}


window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
    maskLayer = createGraphics(width, height);
    redraw();
});