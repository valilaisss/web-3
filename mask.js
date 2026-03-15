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
        width * 0.2057,      // X координата в процентах от ширины
        height * 0.2463,     // Y координата в процентах от высоты
        width * 0.2948       // диаметр в процентах от ширины
    );
    
    // Круг 2: 600x400 пикселей, размер 50px
    maskLayer.circle(
        width * 0.3125,      // 600/1920 = 0.3125
        height * 0.3704,     // 400/1080 = 0.3704
        width * 0.0260       // 50/1920 = 0.0260
    );
    
    // Круг 3: 1000x1000 пикселей, размер 300px
    maskLayer.circle(
        width * 0.5208,      // 1000/1920 = 0.5208
        height * 0.9259,     // 1000/1080 = 0.9259
        width * 0.1563       // 300/1920 = 0.1563
    );
    
    // Рисуем динамическую область (за мышкой)
    let circleWidth = width * 0.15; // 15% от ширины экрана
    maskLayer.circle(mouseX, mouseY, circleWidth);
    
    // Применяем маску
    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer);
    
    // Рисуем результат
    image(maskedImg, 0, 0, width, height);
}

// Добавляем обработчик ресайза
window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
    maskLayer = createGraphics(width, height);
    redraw();
});