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
    
    // НЕ РИСУЕМ КРУГИ В SETUP!
    // Они будут рисоваться только в draw()
}

function draw() {
    // Очищаем маску для динамического эффекта
    maskLayer.clear();
    
    // Рисуем статические круги
    maskLayer.fill(255);
    
    // Круг 1: 395x266 пикселей на макете 1920x1080
    // X: 395/1920 = 0.2057 (20.57%)
    // Y: 266/1080 = 0.2463 (24.63%)
    // Size: 566/1920 = 0.2948 (29.48%)
    maskLayer.circle(
        width * 0.3531,
        height * 0.5083,
        width * 0.2948
    );
    
    // Круг 2: 600x400 пикселей, размер 50px
    maskLayer.circle(
        width * 0.6055,  // 60.55% от ширины
        height * 0.2912, // 29.12% от высоты
        width * 0.2026   // 20.26% от ширины
    );
    
    // Круг 3: 1000x1000 пикселей, размер 300px
    maskLayer.circle(
        width * 0.9797,  // 97.97% от ширины
        height * 0.8176, // 81.76% от высоты
        width * 0.1073   // 10.73% от ширины
    );
    
    // Рисуем динамическую область (за мышкой)
    let circleWidth = width * 0.15; // 15% от ширины экрана
    maskLayer.circle(mouseX, mouseY, circleWidth);
    
    // Применяем маску
    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer);
    
    // Рисуем результат
    image(maskedImg, 0, 0, width, height);

    checkCanvasFill()
    if (revealed) {
        image(secondImg, 0, 0, width, height)
    }
}

// Добавляем обработчик ресайза
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