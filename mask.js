let img;
let secondImg;
let revealed = false;
let maskLayer;
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

    if (frameCount % 20 === 0) {
        checkCanvasFill()
    }

    if (revealed) {
        image(secondImg, 0, 0, width, height)
    }

}

window.addEventListener('resize', () => {

    resizeCanvas(window.innerWidth, window.innerHeight);
    maskLayer = createGraphics(width, height);

    redraw();

});

function checkCanvasFill() {

    if (revealed) return

    maskLayer.loadPixels()
    const data = maskLayer.pixels

    let painted = 0
    let total = data.length / 4

    for (let i = 3; i < data.length; i += 4) {

        if (data[i] > 0) {
            painted++
        }

    }

    let percent = painted / total

    if (percent > 0.95) {

        console.log("canvas заполнен")

        revealed = true

    }

}