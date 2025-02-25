document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript loaded successfully!");

  // script.js
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // IntersectionObserver 설정
  const hiddenElements = document.querySelectorAll(".hidden-text");
  console.log("Hidden elements found:", hiddenElements.length);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Element intersected:", entry.target);
        entry.target.classList.add("visible-text");
        observer.unobserve(entry.target); // 한 번만 실행되게 설정
      }
    });
  });

  // 각 요소 관찰 시작
  hiddenElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  // IntersectionObserver 설정
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const updateCounter = () => {
          const increment = target / 30;
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count).toLocaleString();
            setTimeout(updateCounter, 30);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCounter(); // 카운트 시작
        observer.unobserve(counter); // 한 번만 실행되게 설정
      }
    });
  });

  // 각 카운터 요소를 관찰 시작
  counters.forEach((counter) => observer.observe(counter));
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const slideWidth = slides[0].offsetWidth + 8; // 슬라이드 너비의 50%
  let currentIndex = 0;

  // 트랙에 슬라이드를 복제하여 충분한 공간 확보
  function initializeSlides() {
    for (let i = 0; i < slides.length; i++) {
      const clone = slides[i].cloneNode(true);
      track.appendChild(clone); // 트랙 끝에 복제 추가
    }
  }

  // 슬라이드를 부드럽게 이동하는 함수
  function moveToSlide(index) {
    track.style.transition = "transform 0.5s linear";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  // 복제 및 트랙 초기화 처리
  function handleInfiniteLoop() {
    if (currentIndex >= slides.length - 2) {
      track.style.transition = "none"; // 애니메이션 없이
      currentIndex = 0; // 첫 슬라이드로 이동
      track.style.transform = `translateX(0)`;

      setTimeout(() => {
        track.style.transition = "transform 0.5s linear"; // 애니메이션 복구
      }, 50);
    }
  }

  // 자동 슬라이드 설정
  setInterval(() => {
    currentIndex++; // 다음 슬라이드로 이동
    moveToSlide(currentIndex);
    setTimeout(handleInfiniteLoop, 500); // 애니메이션 후 루프 처리
  }, 3000); // 3초마다 슬라이드 이동

  // 초기화 작업
  initializeSlides();
});
