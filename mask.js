const maskCircles = [
    [0.3531, 0.5083, 0.2948],
    [0.6055, 0.2912, 0.2026],
    [0.9797, 0.8176, 0.1073],
  ];
  
  new p5((p) => {
    let img;
    let newImg1;  // Левая часть
    let newImg2;  // Правая часть
    let newImg3;  // Фон
    let maskLayer;
    let revealed80Logged = false;
    let frameCounter = 0;
    let backgroundChanged = false;
    let maskFrozen = false; // Замораживаем маску после смены
  
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
  
      // Рисуем круг на маске ТОЛЬКО до смены картинок
      if (!backgroundChanged) {
        maskLayer.fill(255);
        maskLayer.circle(p.mouseX, p.mouseY, p.width * 0.15);
      }
      
      frameCounter++;
      if (frameCounter >= 30 && !revealed80Logged && !backgroundChanged) {
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
        // До заполнения: показываем оригинальную картинку с активной маской
        const maskedImg = img.get();
        maskedImg.mask(maskLayer);
        p.image(maskedImg, 0, 0, p.width, p.height);
      } else {
        // После заполнения: показываем новые картинки БЕЗ дальнейшего применения маски
        // Используем сохраненную маску, но больше не обновляем ее
        
        // 1. Сначала фон (самый нижний слой)
        p.image(newImg3, 0, 0, p.width, p.height);
        
        // 2. Левая часть с финальной маской
        const finalMask = maskLayer.get();
        const maskedImg1 = newImg1.get();
        maskedImg1.mask(finalMask);
        p.image(maskedImg1, p.width * 0.1484, 0, p.width * 0.35, p.height * 0.99);
        
        // 3. Правая часть с финальной маской
        const maskedImg2 = newImg2.get();
        maskedImg2.mask(finalMask);
        p.image(maskedImg2, p.width * 0.5, 0, p.width * 0.35, p.height * 0.99);
      }
    };
  
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      initMaskLayer();
      revealed80Logged = false;
      backgroundChanged = false;
      maskFrozen = false;
      frameCounter = 0;
    };
  });