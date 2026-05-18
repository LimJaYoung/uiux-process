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

document.querySelectorAll("[data-level-tabs]").forEach((tabs) => {
  const tabButtons = Array.from(tabs.querySelectorAll("[data-level-tab]"));
  const panels = Array.from(tabs.querySelectorAll("[data-level-panel]"));

  const activateTab = (key, shouldFocus = false) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.levelTab === key;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;

      if (isActive && shouldFocus) {
        button.focus();
      }
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.levelPanel === key;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.levelTab);
    });

    button.addEventListener("keydown", (event) => {
      const currentIndex = tabButtons.indexOf(button);
      const lastIndex = tabButtons.length - 1;
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = lastIndex;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabButtons[nextIndex].dataset.levelTab, true);
    });
  });

  const activateFromHash = () => {
    const hash = window.location.hash.replace("#course-", "");
    if (tabButtons.some((button) => button.dataset.levelTab === hash)) {
      activateTab(hash);
    }
  };

  activateFromHash();
  window.addEventListener("hashchange", activateFromHash);
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
      title: "Beginner: 기획 단계부터 작게 완주하세요",
      copy:
        "AI 구현과 배포가 낯설다면 작은 MVP를 문제 정의, 화면 구조, 작동 화면, 배포 URL까지 연결하는 흐름이 좋습니다.",
      href: "first-product.html",
    },
    {
      max: 4,
      level: "Intermediate",
      title: "Intermediate: 구조나 디자인 단계부터 시작하세요",
      copy:
        "UX 기획이나 Figma 경험이 있다면 사용자 흐름, IA, 디자인 시스템을 구현 조건으로 바꾸는 단계가 잘 맞습니다.",
      href: "structure.html",
    },
    {
      max: 6,
      level: "Advanced",
      title: "Advanced: 구현, QA, 배포를 고도화하세요",
      copy:
        "이미 설계나 화면이 있다면 작동 품질, 반응형, 접근성, 배포 URL, Design.md와 자동화 루틴까지 연결하세요.",
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
      <span>Portfolio Production Flow</span>
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
