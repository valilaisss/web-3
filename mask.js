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
        width * 0.3531,
        height * 0.5083,
        width * 0.2948
    );
    
    maskLayer.circle(
        width * 0.6055,
        height * 0.2912,
        width * 0.2026
    );
    
    maskLayer.circle(
        width * 0.9797,
        height * 0.8176,
        width * 0.1073
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
// let parentCanvas = document.querySelector('#canvas-parent')
// let mask = document.createElement(img)
// mask.src = "assets/images/Mask-1.png"
// parentCanvas.appendChild(mask)