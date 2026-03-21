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
      maskLayer = p.createGraphics(p.width, p.height); // Изменено: используем p.width и p.height
      maskLayer.clear();
      maskLayer.fill(255);
  
      for (const [x, y, size] of maskCircles) {
        maskLayer.circle(p.width * x, p.height * y, p.width * size);
      }
    }
  
    p.setup = async function () {
      img = await p.loadImage("assets/mask.png");
      
      // Получаем размеры родительского контейнера
      const parent = document.querySelector("#canvas-parent");
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      p.createCanvas(width, height).parent("#canvas-parent");
      initMaskLayer();
    };
  
    p.draw = function () {
      if (!img || !maskLayer) {
        return;
      }
  
      maskLayer.fill(255);
      maskLayer.circle(p.mouseX, p.mouseY, p.width * 0.15);
      
      frameCounter++;
      if (frameCounter >= 30 && !revealed80Logged) {
        maskLayer.loadPixels();
  
        let revealedPixels = 0;
        const totalPixels = maskLayer.pixels.length / 4;
  
        for (let i = 3; i < maskLayer.pixels.length; i += 16) {
          if (maskLayer.pixels[i] > 0) {
            revealedPixels++;
          }
        }
  
        const revealedPercent = (revealedPixels * 16) / totalPixels;
  
        if (revealedPercent >= 0.8 && !revealed80Logged) {
          console.log("lyuboy");
          revealed80Logged = true;
          // Короче тут надо добавить див в котором у тебя будет две половинки типа того (который орет). Он будет просто поверх canvas, но под маской. Внутри него сделай просто на pointerMove как с пальцем делали, а тексту сделай ширину через js тоже на pointermove, чтобы оно брало position по left у левой картинки вычитала ее из ширины страницы и делила на 2. Все это тупо поставить в width тегу с текстом
        }
        
        frameCounter = 0;
      }
  
      const maskedImg = img.get();
      maskedImg.mask(maskLayer);
      p.image(maskedImg, 0, 0, p.width, p.height);
    };
  
    p.windowResized = function () {
      const parent = document.querySelector("#canvas-parent");
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      p.resizeCanvas(width, height);
      initMaskLayer();
      revealed80Logged = false;
      frameCounter = 0;
    };
  });