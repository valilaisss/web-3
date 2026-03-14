let img
let maskImage

function preload() {
    img = loadImage('assets/mask.png')
}
function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight)
    myCanvas.parent("#canvas-parent")
    maskLayer = createGraphics(windowWidth, windowHeight)
    // тут нужно будет в процентах все сделать, чтобы на ресайзах норм было, потому что ширина у нас привязана к ширине экрана щас windowWidth, windowHeight
    maskLayer.circle(100, 100, 150);
    maskLayer.circle(600, 400, 50);
    maskLayer.circle(1000, 1000, 300);
}
function draw() {
  
    // 1. Clear the mask layer for a dynamic effect
    // maskLayer.clear();
    
    // 2. Draw the "visible" area on the mask
    maskLayer.fill(255); // White (or any color) defines visible areas
    let circleWidth = 300
    maskLayer.circle(mouseX - circleWidth/2, mouseY - circleWidth/2, circleWidth);
  
    // 3. Create a copy of the image to mask (to avoid permanent changes)
    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer); //
  
    // 4. Draw the result
    image(maskedImg, 0, 0);
  }