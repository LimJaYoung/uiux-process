const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".hero-card_swiper").forEach((swiper) => {
  const track = swiper.querySelector(".swiper-wrapper");
  if (!track) return;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let lastX = 0;

  const getMaxOffset = () => Math.min(0, swiper.clientWidth - track.scrollWidth);
  const clamp = (value) => Math.max(getMaxOffset(), Math.min(0, value));
  const setX = (value) => {
    currentX = clamp(value);
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
  };

  swiper.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    lastX = currentX;
    swiper.classList.add("is-dragging", "is-user-controlled");
    swiper.setPointerCapture(event.pointerId);
  });

  swiper.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    setX(lastX + event.clientX - startX);
  });

  const stopDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    swiper.classList.remove("is-dragging");
    if (swiper.hasPointerCapture(event.pointerId)) {
      swiper.releasePointerCapture(event.pointerId);
    }
  };

  swiper.addEventListener("pointerup", stopDrag);
  swiper.addEventListener("pointercancel", stopDrag);
  swiper.addEventListener("lostpointercapture", () => {
    isDragging = false;
    swiper.classList.remove("is-dragging");
  });
});

document.querySelectorAll(".portfolio-process-grid").forEach((slider) => {
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let momentumFrame = 0;

  const stopMomentum = () => {
    if (momentumFrame) {
      window.cancelAnimationFrame(momentumFrame);
      momentumFrame = 0;
    }
  };

  const runMomentum = () => {
    slider.scrollLeft -= velocity;
    velocity *= 0.96;

    if (Math.abs(velocity) > 0.08) {
      momentumFrame = window.requestAnimationFrame(runMomentum);
      return;
    }

    momentumFrame = 0;
  };

  slider.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startScrollLeft = slider.scrollLeft;
    lastX = event.clientX;
    lastTime = performance.now();
    velocity = 0;
    stopMomentum();
    slider.classList.add("is-dragging");
    slider.setPointerCapture(event.pointerId);
  });

  slider.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    event.preventDefault();

    const now = performance.now();
    const deltaX = event.clientX - startX;
    const frameDelta = event.clientX - lastX;
    const frameTime = Math.max(16, now - lastTime);

    slider.scrollLeft = startScrollLeft - deltaX * 1.18;
    velocity = (frameDelta / frameTime) * 22;
    lastX = event.clientX;
    lastTime = now;
  });

  const stopDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove("is-dragging");

    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }

    runMomentum();
  };

  slider.addEventListener("pointerup", stopDrag);
  slider.addEventListener("pointercancel", stopDrag);
  slider.addEventListener("lostpointercapture", () => {
    isDragging = false;
    slider.classList.remove("is-dragging");
  });
});

document.querySelectorAll(".portfolio-process-section").forEach((section) => {
  const slider = section.querySelector("[data-process-slider]");
  const prevButton = section.querySelector("[data-process-prev]");
  const nextButton = section.querySelector("[data-process-next]");
  if (!slider) return;

  const getStep = () => {
    const card = slider.querySelector(".process-card");
    if (!card) return slider.clientWidth * 0.8;

    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  prevButton?.addEventListener("click", () => {
    slider.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  nextButton?.addEventListener("click", () => {
    slider.scrollBy({ left: getStep(), behavior: "smooth" });
  });
});

let serviceScrollResizeObserver;

const setupServiceScroll = () => {
  const strips = Array.from(document.querySelectorAll(".service-strip"));
  if (!strips.length) return;

  let ticking = false;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const setPxProperty = (element, property, value) => {
    const nextValue = `${Math.max(0, Math.ceil(value))}px`;
    if (element.style.getPropertyValue(property) !== nextValue) {
      element.style.setProperty(property, nextValue);
    }
  };

  const measure = () => {
    strips.forEach((strip) => {
      const track = strip.querySelector("[data-service-track]");
      const sticky = strip.querySelector(".service-sticky");
      if (!track) return;

      const viewport = sticky || strip;
      const viewportStyles = window.getComputedStyle(viewport);
      const leftPadding = parseFloat(viewportStyles.paddingLeft) || 0;
      const rightPadding = parseFloat(viewportStyles.paddingRight) || 0;
      const visibleWidth = viewport.clientWidth - leftPadding - rightPadding;
      const distance = Math.max(0, Math.ceil(track.scrollWidth - visibleWidth));

      setPxProperty(strip, "--service-distance", distance);
      strip.dataset.distance = String(distance);

      if (distance <= 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        track.dataset.serviceX = "0";
      }
    });
  };

  const update = () => {
    strips.forEach((strip) => {
      const track = strip.querySelector("[data-service-track]");
      const distance = Number(strip.dataset.distance || 0);
      if (!track) return;

      if (distance <= 0) {
        track.style.transform = "translate3d(0, 0, 0)";
        track.dataset.serviceX = "0";
        return;
      }

      const stripTop = strip.getBoundingClientRect().top;
      const progress = clamp(-stripTop / distance);
      const nextX = progress <= 0 ? 0 : progress >= 0.999 ? -distance : -distance * progress;

      if (track.dataset.serviceX !== String(nextX)) {
        track.style.transform = `translate3d(${nextX}px, 0, 0)`;
        track.dataset.serviceX = String(nextX);
      }
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  measure();
  update();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    requestUpdate();
  });

  if ("ResizeObserver" in window) {
    serviceScrollResizeObserver?.disconnect();
    serviceScrollResizeObserver = new ResizeObserver(() => {
      measure();
      requestUpdate();
    });

    strips.forEach((strip) => {
      serviceScrollResizeObserver.observe(strip);
      const track = strip.querySelector("[data-service-track]");
      if (track) serviceScrollResizeObserver.observe(track);
    });
  }

  document.fonts?.ready.then(() => {
    measure();
    requestUpdate();
  });
};

window.addEventListener("load", setupServiceScroll);

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.getAttribute("data-copy-target");
    const target = targetId ? document.getElementById(targetId) : null;
    const text = target?.innerText.trim();

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "복사됨";
      button.classList.add("is-copied");
    } catch {
      button.textContent = "복사 실패";
      button.classList.add("is-copy-failed");
    }

    window.setTimeout(() => {
      button.textContent = "복사";
      button.classList.remove("is-copied", "is-copy-failed");
    }, 1600);
  });
});

const diagnosisTool = document.querySelector("[data-diagnosis]");

if (diagnosisTool) {
  const recommendations = [
    {
      max: 2,
      level: "Beginner",
      title: "초급 코스: 첫 UIUX 포트폴리오부터 시작하세요",
      copy:
        "AI 코딩과 배포가 낯설다면 작은 MVP를 기획, 설계, 디자인, 코딩, 배포까지 완주하는 흐름이 좋습니다.",
      href: "first-product.html",
    },
    {
      max: 4,
      level: "Intermediate",
      title: "중급 코스: 서비스형 프로덕트 포트폴리오로 가세요",
      copy:
        "Figma나 UX 기획 경험이 있다면 다중 화면, 디자인 시스템, 케이스 스터디를 묶는 코스가 맞습니다.",
      href: "structure.html",
    },
    {
      max: 6,
      level: "Advanced",
      title: "고급 코스: 실무형 포트폴리오를 고도화하세요",
      copy:
        "팀프로젝트, 퍼스널 브랜딩, 자동화 워크플로우까지 묶어 취업·이직용 결과물을 만듭니다.",
      href: "review.html",
    },
  ];

  const updateDiagnosis = () => {
    const formData = new FormData(diagnosisTool.querySelector(".diagnosis-form"));
    const score = ["tool", "idea", "ship"].reduce(
      (sum, key) => sum + Number(formData.get(key) || 0),
      0,
    );
    const next = recommendations.find((item) => score <= item.max) || recommendations.at(-1);

    diagnosisTool.querySelector("#diagnosis-level").textContent = next.level;
    diagnosisTool.querySelector("#diagnosis-title").textContent = next.title;
    diagnosisTool.querySelector("#diagnosis-copy").textContent = next.copy;
    diagnosisTool.querySelector("#diagnosis-link").setAttribute("href", next.href);
  };

  diagnosisTool.addEventListener("change", updateDiagnosis);
  updateDiagnosis();
}

const lessonHero = document.querySelector(".lesson-hero");

if (lessonHero && !diagnosisTool) {
  const courseSteps = [
    { file: "first-product.html", label: "기획", progress: 15 },
    { file: "structure.html", label: "설계", progress: 30 },
    { file: "design.html", label: "디자인", progress: 50 },
    { file: "build.html", label: "코딩", progress: 70 },
    { file: "review.html", label: "케이스", progress: 84 },
    { file: "launch.html", label: "배포", progress: 94 },
    { file: "automation.html", label: "자동화", progress: 100 },
  ];
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const currentStepIndex = Math.max(
    0,
    courseSteps.findIndex((step) => step.file === currentFile),
  );
  const currentStep = courseSteps[currentStepIndex] || courseSteps[0];
  const progressPanel = document.createElement("section");
  progressPanel.className = "course-progress";
  progressPanel.innerHTML = `
    <div class="course-progress-head">
      <span>Portfolio Course Progress</span>
      <span>${currentStep.label} · ${currentStep.progress}%</span>
    </div>
    <div class="course-progress-track"><i style="width: ${currentStep.progress}%"></i></div>
    <div class="course-progress-steps">
      ${courseSteps
        .map(
          (step, index) =>
            `<span class="${index <= currentStepIndex ? "is-active" : ""}">${step.label}</span>`,
        )
        .join("")}
    </div>
  `;
  lessonHero.insertAdjacentElement("afterend", progressPanel);

  const practicePanel = document.createElement("section");
  practicePanel.className = "practice-panel";
  practicePanel.innerHTML = `
    <div>
      <p class="eyebrow">Practice Flow</p>
      <h2>이 실습은 이렇게 진행합니다</h2>
    </div>
    <ol>
      <li><strong>사이트에서 읽기</strong><span>목표, 준비물, 프롬프트를 확인합니다.</span></li>
      <li><strong>AI 도구에서 실행</strong><span>프롬프트를 복사해 프로젝트에 적용합니다.</span></li>
      <li><strong>브라우저에서 검수</strong><span>체크리스트로 결과를 보고 다시 개선합니다.</span></li>
    </ol>
  `;
  progressPanel.insertAdjacentElement("afterend", practicePanel);
}
