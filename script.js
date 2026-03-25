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

  const overlay = document.querySelector('.info-overlay');
  const textBox = document.querySelector('.info-text');
  const closeBtn = document.querySelector('.close-button');

  // =====================
  // СЛАЙДЫ
  // =====================
  let activeButton = null;

  function showSlide(index) {

    // Скрываем overlay при переключении и возвращаем кнопку
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
    
    if (activeButton) {
      activeButton.style.display = 'block';
      activeButton = null;
    }

    thirdScreen.style.backgroundImage = backgrounds[index];

    slideContents.forEach((content, i) => {
      content.style.display = i === index ? 'block' : 'none';
    });

    pageNumber.textContent = `(${String(index).padStart(2, '0')})`;
    const infoTextPositions = ['19.16%;', '64.94%', '67.64%', '65%', '65%'];
    textBox.style.top = infoTextPositions[index];
    currentIndex = index;
  }


  

  document.querySelector('.arrow-left').onclick = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = totalSlides - 1;
    showSlide(newIndex);
  };

  document.querySelector('.arrow-right').onclick = () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= totalSlides) newIndex = 0;
    showSlide(newIndex);
  };

  // =====================
  // OVERLAY
  // =====================
  document.querySelectorAll('.inf-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const id = btn.dataset.id;
      if (!id) return;

      const hidden = document.getElementById(id);
      if (!hidden) return;

      textBox.innerHTML = hidden.innerHTML;

      activeButton = btn;
      activeButton.style.display = 'none';
      overlay.classList.add('active');
    });
  });

  // Закрытие по кнопке close-button
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.remove('active');
    
    if (activeButton) {
      activeButton.style.display = 'block';
      activeButton = null;
    }
  });

  showSlide(0);
});
