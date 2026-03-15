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
    
    // ВСЕ В ПРОЦЕНТАХ!
    // Круг в центре (50% ширины, 30% высоты)

}

function draw() {
    // Очищаем маску для динамического эффекта
    maskLayer.clear();
    
    // Сначала рисуем статические круги (проценты от текущего размера окна)
    maskLayer.fill(255);
    maskLayer.circle(width * 0.2057, height * 0.2463, width * 0.2948);
    maskLayer.circle(width * 0.2, height * 0.5, width * 0.03);
    maskLayer.circle(width * 0.8, height * 0.8, width * 0.2);
    
    // Рисуем динамическую область (за мышкой) - тоже в процентах
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
    
    // Пересоздаем маску с новыми размерами
    maskLayer = createGraphics(width, height);
    
    // Все круги пересчитываются автоматически в draw()
    redraw();
});