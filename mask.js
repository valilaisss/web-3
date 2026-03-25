const maskCircles = [
    [0.3531, 0.5083, 0.2948],
    [0.6055, 0.2912, 0.2026],
    [0.9797, 0.8176, 0.1073],
  ];
  
  new p5((p) => {
    let img;
    let newImg1;  // Первая новая картинка
    let newImg2;  // Вторая новая картинка
    let newImg3;  // Третья новая картинка
    let maskLayer;
    let revealed80Logged = false;
    let frameCounter = 0;
    let backgroundChanged = false;
  
    function initMaskLayer() {
      maskLayer = p.createGraphics(window.innerWidth, window.innerHeight);
      maskLayer.clear();
      maskLayer.fill(255);
  
      for (const [x, y, size] of maskCircles) {
        maskLayer.circle(p.width * x, p.height * y, p.width * size);
      }
    }
  
    p.setup = async function () {
      // Загружаем все картинки
      img = await p.loadImage("assets/images/draw-picture.svg");
      newImg1 = await p.loadImage("assets/images/left-part-human.svg");
      newImg2 = await p.loadImage("assets/images/right-part-human.svg");
      newImg3 = await p.loadImage("assets/images/bg-human.svg");
      
      p.createCanvas(window.innerWidth, window.innerHeight).parent("#canvas-parent");
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
          console.log("Достигнуто 80%! Меняем картинки...");
          revealed80Logged = true;
          backgroundChanged = true;
          
          const event = new CustomEvent('maskComplete', { 
            detail: { message: 'Маска заполнена' } 
          });
          window.dispatchEvent(event);
        }
        
        frameCounter = 0;
      }
      
      // Выбираем какие картинки показывать
      if (!backgroundChanged) {
        // До заполнения: показываем оригинальную картинку
        const maskedImg = img.get();
        maskedImg.mask(maskLayer);
        p.image(maskedImg, 0, 0, p.width, p.height);
      } else {
        // После заполнения: показываем 3 новые картинки
        // Все три картинки накладываются друг на друга
        const maskedImg3 = newImg3.get();
        maskedImg3.mask(maskLayer);
        p.image(maskedImg3, 0, 0, p.width, p.height);

        const maskedImg1 = newImg1.get();
        maskedImg1.mask(maskLayer);
        p.image(maskedImg1, p.width * 0.1484, 0, p.width * 0.35, p.height * 0.99);
        
        const maskedImg2 = newImg2.get();
        maskedImg2.mask(maskLayer);
        p.image(maskedImg2, p.width * 0.5, 0, p.width * 0.35, p.height * 0.99);
        
      }
    };
  
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      initMaskLayer();
      revealed80Logged = false;
      backgroundChanged = false;
      frameCounter = 0;
    };
  });