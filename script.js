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

const setupHomeSectionOrder = () => {
  const main = document.querySelector("main");
  if (!main) return;

  const placeAfter = (targetSelector, anchorSelector) => {
    const target = main.querySelector(targetSelector);
    const anchor = main.querySelector(anchorSelector);
    if (target && anchor && anchor.nextElementSibling !== target) {
      anchor.after(target);
    }
  };

  placeAfter(".outcome-section", ".proof-strip");
  placeAfter(".bottleneck-section", ".outcome-section");
  placeAfter(".lab-method", ".bottleneck-section");
  placeAfter(".roadmap-section", ".lab-method");
  placeAfter(".curriculum", ".roadmap-section");
  placeAfter(".service-strip", ".curriculum");
  placeAfter(".prompt-gallery", ".service-strip");
  placeAfter(".resources", ".prompt-gallery");
  placeAfter(".testimonial-section", ".resources");
  placeAfter(".faq-section", ".testimonial-section");
  placeAfter(".final-home-cta", ".faq-section");
};

setupHomeSectionOrder();

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

    await navigator.clipboard.writeText(text);
    button.textContent = "복사됨";
    button.classList.add("is-copied");

    window.setTimeout(() => {
      button.textContent = "복사";
      button.classList.remove("is-copied");
    }, 1600);
  });
});

const diagnosisTool = document.querySelector("[data-diagnosis]");

if (diagnosisTool) {
  const recommendations = [
    {
      max: 1,
      level: "Level 0",
      title: "Claude Code 활용 가이드부터 시작하세요",
      copy:
        "설치, 프로젝트 열기, 프롬프트 실행, 브라우저 확인 흐름을 먼저 익히면 이후 실습이 훨씬 편해집니다.",
      href: "guide.html",
    },
    {
      max: 2,
      level: "Level 1",
      title: "첫 프로덕트 기획부터 시작하세요",
      copy:
        "아이디어가 아직 흐릿하다면 사용자 문제, 타깃, MVP 범위를 먼저 좁히는 편이 좋습니다.",
      href: "first-product.html",
    },
    {
      max: 3,
      level: "Level 2",
      title: "사용자 흐름과 IA를 설계하세요",
      copy:
        "아이디어가 있다면 바로 화면을 만들기보다 사용자 여정, 화면 목록, 상태 화면을 정리하세요.",
      href: "structure.html",
    },
    {
      max: 4,
      level: "Level 3",
      title: "와이어프레임과 UI 방향을 잡으세요",
      copy:
        "화면 구조가 보인다면 UI 기준, 컴포넌트, 반응형 규칙을 구현 가능한 언어로 바꿀 차례입니다.",
      href: "design.html",
    },
    {
      max: 5,
      level: "Level 4",
      title: "Claude Code로 첫 화면을 구현하세요",
      copy:
        "프로젝트와 디자인 기준이 준비됐다면 Claude Code에서 실제 작동하는 화면을 만들어보세요.",
      href: "build.html",
    },
    {
      max: 6,
      level: "Level 5",
      title: "검수, 배포, 자동화 단계로 가세요",
      copy:
        "이미 구현 경험이 있다면 QA와 배포 URL, CLAUDE.md로 반복 가능한 워크플로우를 완성하세요.",
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
  const practicePanel = document.createElement("section");
  practicePanel.className = "practice-panel";
  practicePanel.innerHTML = `
    <div>
      <p class="eyebrow">Practice Flow</p>
      <h2>이 실습은 이렇게 진행합니다</h2>
    </div>
    <ol>
      <li><strong>사이트에서 읽기</strong><span>목표, 준비물, 프롬프트를 확인합니다.</span></li>
      <li><strong>Claude Code에서 실행</strong><span>프롬프트를 복사해 프로젝트에 적용합니다.</span></li>
      <li><strong>브라우저에서 검수</strong><span>체크리스트로 결과를 보고 다시 개선합니다.</span></li>
    </ol>
  `;
  lessonHero.insertAdjacentElement("afterend", practicePanel);
}
