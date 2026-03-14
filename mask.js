let photo
let maskImage

function preload() {
    photo = loadImage('assets/mask.png')
}
function setup() {
    createCanvas(400, 400)
    maskLayer = createGraphics(400, 400)
}
function draw() {
    background(255);
  
    // 1. Clear the mask layer for a dynamic effect
    maskLayer.clear();
    
    // 2. Draw the "visible" area on the mask
    maskLayer.fill(255); // White (or any color) defines visible areas
    maskLayer.circle(mouseX, mouseY, 150);
  
    // 3. Create a copy of the image to mask (to avoid permanent changes)
    let maskedImg = img.get(); 
    maskedImg.mask(maskLayer); //
  
    // 4. Draw the result
    image(maskedImg, 0, 0);
  }