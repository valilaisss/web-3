const maskCircles = [
    [0.3531, 0.5083, 0.2948],
    [0.6055, 0.2912, 0.2026],
    [0.9797, 0.8176, 0.1073],
  ];
  
  new p5((p) => {
    let img;
    let maskLayer;
    let revealed80Logged = false;
    let frameCounter = 0;
  
    function initMaskLayer() {
      maskLayer = p.createGraphics(window.innerWidth, window.innerHeight);
      maskLayer.clear();
      maskLayer.fill(255);
  
      for (const [x, y, size] of maskCircles) {
        maskLayer.circle(p.width * x, p.height * y, p.width * size);
      }
    }
  
    p.setup = async function () {
      img = await p.loadImage("assets/images/draw-picture.png");
      p.createCanvas(window.innerWidth, window.innerHeight).parent("#canvas-parent");
      initMaskLayer();
    };
  
    p.draw = function () {
      if (!img || !maskLayer) {
        return;
      }
  
      maskLayer.fill(255);
      maskLayer.circle(p.mouseX, p.mouseY, p.width * 0.35);
      
      frameCounter++;
      if (frameCounter >= 30 && !revealed80Logged) {
        maskLayer.loadPixels();
        
        let revealedPixels = 0;
        let sampledPixels = 0;
        const step = 8;
        
        for (let i = 3; i < maskLayer.pixels.length; i += step * 4) {
          sampledPixels++;
          if (maskLayer.pixels[i] > 0) {
            revealedPixels++;
          }
        }
        
        const revealedPercent = (revealedPixels / sampledPixels);
        
        console.log(`Открыто: ${Math.round(revealedPercent * 100)}%`);
        
        if (revealedPercent >= 0.8 && !revealed80Logged) {
          console.log("lyuboy");
          revealed80Logged = true;
          
          // Создаем контейнер с новыми картинками
          if (!document.querySelector('.new-images-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'new-images-overlay';
            
            const bgImg = document.createElement('img');
            bgImg.src = "assets/images/bg-human.png";
            bgImg.className = 'overlay-bg';
            
            const leftImg = document.createElement('img');
            leftImg.src = "assets/images/left-part-human.png";
            leftImg.className = 'overlay-left';
            
            const rightImg = document.createElement('img');
            rightImg.src = "assets/images/right-part-human.png";
            rightImg.className = 'overlay-right';
            
            overlay.appendChild(bgImg);
            overlay.appendChild(leftImg);
            overlay.appendChild(rightImg);
            
            document.querySelector('#canvas-parent').appendChild(overlay);
          }
        }
        
        frameCounter = 0;
      }
      
      const maskedImg = img.get();
      maskedImg.mask(maskLayer);
      p.image(maskedImg, 0, 0, p.width, p.height);
    };
  
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      initMaskLayer();
      revealed80Logged = false;
      frameCounter = 0;
      
      const existingOverlay = document.querySelector('.new-images-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }
    };
  });