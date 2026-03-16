let img;
let secondImg;

let maskLayer;

let revealed = false;

let secondX = 0;
let secondY = 0;
let dragging = false;

function preload() {

    img = loadImage('assets/mask.png')
    secondImg = loadImage('assets/secondScreen.png')

}

function setup() {

    let myCanvas = createCanvas(window.innerWidth, window.innerHeight)
    myCanvas.parent("#canvas-parent")

    maskLayer = createGraphics(width, height)

}

function draw() {

    if (!revealed) {

        drawReveal()

        // проверяем заполнение
        if (frameCount % 30 === 0) {
            checkCanvasFill()
        }

    } else {

        drawSecondScreen()

    }

}

function drawReveal() {

    maskLayer.clear()
    maskLayer.fill(255)

    maskLayer.circle(width * 0.3531, height * 0.5083, width * 0.2948)
    maskLayer.circle(width * 0.6055, height * 0.2912, width * 0.2026)
    maskLayer.circle(width * 0.9797, height * 0.8176, width * 0.1073)

    let circleWidth = width * 0.15
    maskLayer.circle(mouseX, mouseY, circleWidth)

    let maskedImg = img.get()
    maskedImg.mask(maskLayer)

    image(maskedImg, 0, 0, width, height)

}

function drawSecondScreen() {

    // фон
    image(img, 0, 0, width, height)

    // новая картинка поверх
    image(secondImg, secondX, secondY, width, height)

}

function checkCanvasFill() {

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

        console.log("canvas почти полностью закрашен")
        revealed = true

    }

}

function mousePressed() {

    if (revealed) {
        dragging = true
    }

}

function mouseDragged() {

    if (dragging) {

        secondX = mouseX - width / 2
        secondY = mouseY - height / 2

    }

}

function mouseReleased() {

    dragging = false

}

window.addEventListener('resize', () => {

    resizeCanvas(window.innerWidth, window.innerHeight)
    maskLayer = createGraphics(width, height)

})