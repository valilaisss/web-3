const maskCircles = [
    [0.3531, 0.5083, 0.2948],
    [0.6055, 0.2912, 0.2026],
    [0.9797, 0.8176, 0.1073],
  ];
  
  new p5((p) => {
    let img;
    let secondImg; // Новая картинка
    let maskLayer;
    let revealed80Logged = false;
    let frameCounter = 0;
    let backgroundChanged = false; // Флаг для отслеживания смены фона
  
    function initMaskLayer() {
      maskLayer = p.createGraphics(window.innerWidth, window.innerHeight);
      maskLayer.clear();
      maskLayer.fill(255);
  
      for (const [x, y, size] of maskCircles) {
        maskLayer.circle(p.width * x, p.height * y, p.width * size);
      }
    }
  
    p.setup = async function () {
      // Загружаем обе картинки
      img = await p.loadImage("assets/mask.png");
      secondImg = await p.loadImage("assets/images/left-part-human.png"); // Новая картинка
      p.createCanvas(window.innerWidth, window.innerHeight).parent("#canvas-parent");
      initMaskLayer();
    };
  
    p.draw = function () {
      if (!img || !maskLayer) {
        return;
      }
  
      maskLayer.fill(255);
      maskLayer.circle(p.mouseX, p.mouseY, p.width * 0.15);
      
      // Проверяем процент только раз в 30 кадров
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
          console.log("Достигнуто 80%! Меняем фон...");
          revealed80Logged = true;
          backgroundChanged = true;
          
          // Создаем событие, которое можно перехватить в другом месте
          const event = new CustomEvent('maskComplete', { 
            detail: { message: 'Маска заполнена' } 
          });
          window.dispatchEvent(event);
        }
        
        frameCounter = 0;
      }
      
      // Выбираем какую картинку показывать
      let currentImg = backgroundChanged ? secondImg : img;
      
      if (currentImg) {
        const maskedImg = currentImg.get();
        maskedImg.mask(maskLayer);
        p.image(maskedImg, 0, 0, p.width, p.height);
      }
    };
  
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      initMaskLayer();
      revealed80Logged = false;
      backgroundChanged = false; // Сбрасываем флаг при изменении размера
      frameCounter = 0;
    };
  });