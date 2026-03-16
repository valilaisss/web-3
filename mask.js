let img;
let secondImg;
let revealed = false;

function preload() {
    img = loadImage('assets/mask.png')
    secondImg = loadImage('assets/_ (37).jpeg')
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

    checkCanvasFill()
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

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

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