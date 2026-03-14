let img
let maskImage

function preload() {
    img = loadImage('assets/mask.png')
}
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
function setup() {
    createCanvas(windowWidth, windowHeight)
    maskLayer = createGraphics(windowWidth, windowHeight)
}
function draw() {
    background(255);
  
    // 1. Clear the mask layer for a dynamic effect
    maskLayer.clear();
    
    // 2. Draw the "visible" area on the mask
    maskLayer.fill(255); // White (or any color) defines visible areas
    maskLayer.circle(mouseX, mouseY, 300);
  
    // 3. Create a copy of the image to mask (to avoid permanent changes)
    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer); //
  
    // 4. Draw the result
    image(maskedImg, 0, 0);
  }