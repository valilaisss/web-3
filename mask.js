let img;
let maskLayer;

function preload() {
    img = loadImage('assets/mask.png');
}

function setup() {
    let myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent("#canvas-parent");
    maskLayer = createGraphics(width, height);
}

function draw() {
    maskLayer.clear();
    maskLayer.fill(255);
    
    // Ваши круги
    maskLayer.circle(width * 0.3531, height * 0.5083, width * 0.2948);
    maskLayer.circle(width * 0.6055, height * 0.2912, width * 0.2026);
    maskLayer.circle(width * 0.9797, height * 0.8176, width * 0.1073);
    maskLayer.circle(mouseX, mouseY, width * 0.15);

    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer);
    image(maskedImg, 0, 0, width, height);

    // ПРОВЕРКА ПИКСЕЛЕЙ (каждые 4 кадра)
    if (frameCount % 4 === 0) {
        checkTransparency(maskedImg);
    }
}

function checkTransparency(targetImg) {
    targetImg.loadPixels();
    let transparentCount = 0;
    let totalPixels = targetImg.pixels.length / 4;

    // Проходим циклом по массиву (шаг 4, так как на 1 пиксель идет 4 значения: R,G,B,A)
    for (let i = 3; i < targetImg.pixels.length; i += 4) {
        // Если альфа-канал равен 0 (прозрачно)
        if (targetImg.pixels[i] === 0) {
            transparentCount++;
        }
    }

    let transparencyPercent = (transparentCount / totalPixels) * 100;

    if (transparencyPercent > 80) {
        console.log("ПРОЙДЕНО: Прозрачность более 80% (" + transparencyPercent.toFixed(2) + "%)");
    }
}

window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
    maskLayer = createGraphics(width, height);
});
