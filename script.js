const sources = [
  "assets/images/draw-1.svg",
  "assets/images/draw-2.svg",
  "assets/images/draw-3.svg",
  "assets/images/draw-4.svg",
  "assets/images/draw-5.svg"
];
const drawArea = document.getElementById("drawArea");
let drawing = false;
let lastDrawTime = 0;
drawArea.addEventListener("pointerdown", () => drawing = true);
document.addEventListener("pointerup", () => drawing = false);

drawArea.addEventListener("pointermove", (e)=>{
  if(!drawing) return;
  
  const now = Date.now();
  if(now - lastDrawTime < 50) return;
  lastDrawTime = now;
  const rect = drawArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const img = document.createElement("img");
  const random = Math.floor(Math.random() * sources.length);
  img.src = sources[random];
  img.className = "stamp";
  img.style.left = (x - 20) + "px";
  img.style.top = (y - 20) + "px";
  drawArea.appendChild(img);

  requestAnimationFrame(() => {
    img.style.opacity = 1;
    img.style.transform = "scale(1)";
  });

  setTimeout(() => {
    img.style.opacity = 0;
    img.style.transform = "scale(0.5)";
    setTimeout(() => img.remove(), 500);
  }, 2000);
});


document.getElementById("nap-word").addEventListener("click", () => {
  if(document.querySelector(".active-sleep-box")) return;
  const box = document.createElement("div");
  box.innerHTML = `
  <p style='text-align: justify; display: flex; flex-direction: column; gap: 0;'>
    --- не пассивное состояние, а активный
    нейробиологический процесс, выполняющий
    функции жизнеобеспечения, которые
    невозможны в состоянии бодрствования. Это
    важнейшая физиологическая потребность,
    сравнимая с дыханием и питанием.
  </p>
  `
  box.className = "active-sleep-box";
  drawArea.appendChild(box);

  requestAnimationFrame(() => {
    box.style.opacity = 1;
    box.style.transform = "scale(1)";
  });

  box.addEventListener("click", () => {
    box.style.opacity = 0;
    box.style.transform = "scale(0.5)";
    setTimeout(() => box.remove(), 500);
  });
});






document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const totalSlides = 5;
  
  const backgrounds = [
      'url("assets/images/bg-screen-3.png")',
      'url("assets/images/bg-slide-1.svg")',
      'url("assets/images/bg-slide-2.svg")',
      'url("assets/images/bg-slide-3.png")',
      'url("assets/images/bg-slide-4.png")'
  ];
  
  const thirdScreen = document.querySelector('.third-screen');
  const slideContents = document.querySelectorAll('.slide-content');
  const pageNumber = document.querySelector('.page-number');
  
  function showSlide(index) {
      thirdScreen.style.backgroundImage = backgrounds[index];
      
      slideContents.forEach((content, i) => {
          content.style.display = i === index ? 'block' : 'none';
      });
      
      pageNumber.textContent = `(${String(index + 1).padStart(2, '0')})`;
      
      currentIndex = index;
  }
  
  document.querySelector('.arrow-left').onclick = () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = totalSlides - 1;
      showSlide(newIndex);
  };
  
  document.querySelector('.arrow-right').onclick = () => {
    console.log('test')
  }
  document.querySelector('.arrow-right').onclick = () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= totalSlides) newIndex = 0;
      showSlide(newIndex);
  };
  
  showSlide(0);
});





const overlay = document.querySelector('.info-overlay');
const textBox = document.querySelector('.info-text');


document.querySelectorAll('.inf-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const id = btn.dataset.id;
      const text = document.getElementById(id).innerHTML;

      textBox.innerHTML = text;

      overlay.classList.add('active');
  });
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
});
