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

document.querySelectorAll("[data-ai-diagnosis]").forEach((diagnosis) => {
  const areas = [
    { name: "AI 툴 활용", color: "#8b85f0", bg: "rgba(139,133,240,0.15)" },
    { name: "프롬프트 설계", color: "#2dd4a0", bg: "rgba(45,212,160,0.15)" },
    { name: "워크플로우 통합", color: "#f07060", bg: "rgba(240,112,96,0.15)" },
    { name: "포트폴리오 연결", color: "#e8a830", bg: "rgba(232,168,48,0.15)" },
  ];

  const questions = [
    { area: 0, title: "Figma AI 기능을 실무에서 사용해본 적 있나요?", sub: "Make design, Make prototype, Rename layers 등 Figma 내장 AI 기능을 기준으로 답해주세요." },
    { area: 0, title: "AI 이미지 생성 툴을 디자인 작업에 활용해봤나요?", sub: "Midjourney, DALL·E, Adobe Firefly, Stable Diffusion 등 이미지 생성 AI를 기준으로 답해주세요." },
    { area: 0, title: "Stitch, v0, Claude 같은 AI 기반 UI 생성 툴을 사용해봤나요?", sub: "프롬프트로 UI를 생성하거나 코드를 뽑아내는 툴 사용 경험을 기준으로 답해주세요." },
    { area: 1, title: "프롬프트를 작성할 때 역할·맥락·출력 형식을 구분해 쓰나요?", sub: "예: 너는 UIUX 디자이너야. 아래 앱의 온보딩 화면 카피를 3가지 버전으로 작성해줘." },
    { area: 1, title: "같은 결과를 얻기 위해 프롬프트를 반복 수정하며 개선한 경험이 있나요?", sub: "첫 답변이 마음에 들지 않아 프롬프트를 다듬어 원하는 결과를 얻어낸 경험을 기준으로 답해주세요." },
    { area: 1, title: "UX 리서치나 경쟁사 분석 등 기획 작업에 AI를 활용해봤나요?", sub: "페르소나 작성, 사용자 인터뷰 분석, HMW 질문 도출 등의 작업에서 AI를 쓴 경험을 기준으로 답해주세요." },
    { area: 2, title: "AI로 생성한 결과물을 실제 Figma 작업에 그대로 연결한 경험이 있나요?", sub: "AI 생성 이미지, 카피, 컴포넌트 등을 Figma 파일에 바로 활용한 경험을 기준으로 답해주세요." },
    { area: 2, title: "MCP나 플러그인으로 AI와 디자인 툴을 연결해봤나요?", sub: "Figma MCP, Claude MCP 등을 통해 AI가 Figma를 직접 제어하도록 설정한 경험을 기준으로 답해주세요." },
    { area: 2, title: "AI로 만든 결과물이 실제 서비스·납품·배포까지 이어진 적 있나요?", sub: "단순 실습이 아닌, AI를 활용한 결과물이 실제 프로젝트 산출물로 사용된 경험을 기준으로 답해주세요." },
    { area: 3, title: "AI 활용 과정을 포트폴리오 케이스스터디로 정리한 적 있나요?", sub: "AI를 어떻게 썼는가를 프로세스로 보여주는 포트폴리오 챕터나 슬라이드를 만들어본 경험을 기준으로 답해주세요." },
    { area: 3, title: "AI를 활용한 나만의 디자인 프로세스를 언어로 설명할 수 있나요?", sub: "면접이나 발표 자리에서 저는 이렇게 AI를 씁니다라고 구체적으로 설명할 수 있는지 기준으로 답해주세요." },
    { area: 3, title: "AI 활용 역량을 강점으로 내세운 퍼스널 브랜딩이나 SNS 콘텐츠가 있나요?", sub: "노션, 브런치, 인스타그램, 링크드인 등에서 AI 디자이너로서의 정체성을 보여준 경험을 기준으로 답해주세요." },
  ];

  const choices = [
    { icon: "✓", main: "네, 자주 씁니다", desc: "실무나 프로젝트에서 정기적으로 활용 중", score: 3, color: "#2dd4a0", bg: "rgba(45,212,160,0.15)" },
    { icon: "↻", main: "해봤지만 가끔만요", desc: "몇 번 시도해봤으나 지속적이진 않음", score: 2, color: "#e8a830", bg: "rgba(232,168,48,0.15)" },
    { icon: "·", main: "알지만 아직 안 해봤어요", desc: "존재는 알지만 직접 사용 경험 없음", score: 1, color: "#8b85f0", bg: "rgba(139,133,240,0.15)" },
    { icon: "?", main: "잘 모르겠어요", desc: "이 기능이나 툴에 대해 잘 모름", score: 0, color: "#888890", bg: "rgba(100,100,120,0.15)" },
  ];

  const levels = [
    { min: 0, max: 10, mark: "Lv.1", name: "탐색자", icon: "01", color: "#888890", desc: "AI 툴에 아직 낯선 단계입니다. 기본 디자인 역량을 다지면서 AI를 하나씩 체험하는 것부터 시작하세요.", recommends: [
      { icon: "A", label: "Figma 기초 포트폴리오", tag: "지금 시작", color: "#8b85f0", body: "Figma의 기본 기능으로 케이스스터디 1개를 완성하세요. UI 구성, 프로토타입, 발표 자료 흐름을 익히는 것이 우선입니다." },
      { icon: "B", label: "AI 툴 탐색 챌린지", tag: "병행 추천", color: "#2dd4a0", body: "Figma AI의 Rename layers나 Make design을 1주일만 써보세요. 결과 스크린샷은 나중에 포트폴리오 소재가 됩니다." },
    ] },
    { min: 11, max: 22, mark: "Lv.2", name: "실험자", icon: "02", color: "#8b85f0", desc: "AI 툴을 가끔 쓰지만 아직 체계적이진 않습니다. 프롬프트 설계를 배우고 결과물을 정리하는 습관을 만들어보세요.", recommends: [
      { icon: "A", label: "AI 활용 UX 케이스스터디", tag: "핵심 미션", color: "#8b85f0", body: "기존 프로젝트 1개를 AI로 다시 작업해보세요. 페르소나 작성, 카피 생성, 이미지 소싱 중 하나만 AI로 해도 충분합니다." },
      { icon: "B", label: "프롬프트 설계 학습", tag: "역량 강화", color: "#e8a830", body: "역할, 맥락, 출력 형식 구조로 프롬프트를 쓰는 연습을 하세요. AI 결과와 수동 작업 결과를 비교하면 좋은 포트폴리오 콘텐츠가 됩니다." },
    ] },
    { min: 23, max: 27, mark: "Lv.3", name: "적용자", icon: "03", color: "#f07060", desc: "AI를 실무에 적용하고 있지만 아직 포트폴리오로 연결하지 못한 단계입니다. 지금 가진 결과물을 정리하는 것이 가장 큰 과제입니다.", recommends: [
      { icon: "A", label: "Figma MCP 포트폴리오 제작", tag: "지금 단계", color: "#f07060", body: "Figma MCP를 연결해 AI가 Figma를 직접 제어하는 워크플로우를 기록하세요. 내가 이렇게 AI를 쓴다는 강력한 차별화 포인트가 됩니다." },
      { icon: "B", label: "AI 프로세스 문서화", tag: "병행 추천", color: "#8b85f0", body: "Before/After 비교, 사용한 프롬프트, 시간 단축 수치를 케이스스터디로 정리하세요." },
    ] },
    { min: 28, max: 32, mark: "Lv.4", name: "통합자", icon: "04", color: "#2dd4a0", desc: "AI를 디자인 프로세스 전반에 통합하고 있습니다. 이제 이 역량을 포트폴리오와 브랜딩으로 보여줄 차례입니다.", recommends: [
      { icon: "A", label: "풀스택 디자인 포트폴리오", tag: "핵심 미션", color: "#2dd4a0", body: "UX 기획, Figma 디자인, AI 코드 생성, 배포까지 이어지는 풀스택 프로젝트 1개를 완성하세요." },
      { icon: "B", label: "AI 워크플로우 시각화", tag: "차별화 포인트", color: "#e8a830", body: "저는 이렇게 AI를 씁니다라는 플로우차트를 포트폴리오에 넣으세요. 채용 담당자가 역량을 빠르게 이해할 수 있습니다." },
    ] },
    { min: 33, max: 36, mark: "Lv.5", name: "선도자", icon: "05", color: "#e8a830", desc: "AI 디자이너로서 뛰어난 역량을 갖추고 있습니다. 개인 브랜딩과 지식 공유로 업계에서 존재감을 키울 차례입니다.", recommends: [
      { icon: "A", label: "퍼스널 브랜딩 포트폴리오", tag: "지금 단계", color: "#e8a830", body: "AI를 가장 잘 쓰는 디자이너로 포지셔닝하세요. 개인 웹사이트와 SNS 채널을 연동하고 AI 워크플로우 콘텐츠를 발행하세요." },
      { icon: "B", label: "강의·멘토링·기고 시작", tag: "성장 단계", color: "#2dd4a0", body: "AI 디자인 관련 글쓰기, 세미나 발표, 사내 스터디 리드를 시작하세요." },
    ] },
  ];

  const intro = diagnosis.querySelector("[data-ai-intro]");
  const quiz = diagnosis.querySelector("[data-ai-quiz]");
  const result = diagnosis.querySelector("[data-ai-result]");
  let currentIndex = 0;
  let answers = new Array(questions.length).fill(null);

  const renderQuestion = () => {
    const question = questions[currentIndex];
    const area = areas[question.area];
    const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

    diagnosis.querySelector("[data-ai-progress-label]").textContent = `${currentIndex + 1} / ${questions.length}`;
    diagnosis.querySelector("[data-ai-progress-fill]").style.width = `${progress}%`;
    const chip = diagnosis.querySelector("[data-ai-area-chip]");
    chip.textContent = `영역 ${question.area + 1} · ${area.name}`;
    chip.style.background = area.bg;
    chip.style.color = area.color;
    diagnosis.querySelector("[data-ai-question-area]").textContent = area.name;
    diagnosis.querySelector("[data-ai-question-title]").textContent = question.title;
    diagnosis.querySelector("[data-ai-question-sub]").textContent = question.sub;

    const choiceList = diagnosis.querySelector("[data-ai-choices]");
    choiceList.innerHTML = "";
    choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `ai-choice${answers[currentIndex] === index ? " is-selected" : ""}`;
      button.innerHTML = `
        <span class="ai-choice-icon" style="background:${choice.bg};color:${choice.color}">${choice.icon}</span>
        <span><strong>${choice.main}</strong><small>${choice.desc}</small></span>
        <span class="ai-choice-score" style="background:${choice.bg};color:${choice.color}">+${choice.score}</span>
      `;
      button.addEventListener("click", () => {
        answers[currentIndex] = index;
        renderQuestion();
      });
      choiceList.append(button);
    });

    diagnosis.querySelector("[data-ai-prev]").disabled = currentIndex === 0;
    diagnosis.querySelector("[data-ai-next]").disabled = answers[currentIndex] === null;
    diagnosis.querySelector("[data-ai-next]").textContent =
      currentIndex === questions.length - 1 ? "결과 보기" : "다음";
  };

  const showResult = () => {
    const areaTotals = [0, 0, 0, 0];
    answers.forEach((answer, index) => {
      if (answer !== null) {
        areaTotals[questions[index].area] += choices[answer].score;
      }
    });
    const total = areaTotals.reduce((sum, value) => sum + value, 0);
    const level = levels.find((item) => total >= item.min && total <= item.max) || levels.at(-1);

    quiz.hidden = true;
    result.hidden = false;
    diagnosis.querySelector("[data-ai-badge]").style.background = `${level.color}1f`;
    diagnosis.querySelector("[data-ai-badge-emoji]").textContent = level.icon;
    const badgeLevel = diagnosis.querySelector("[data-ai-badge-level]");
    badgeLevel.textContent = `${level.mark} ${level.name}`;
    badgeLevel.style.color = level.color;
    diagnosis.querySelector("[data-ai-result-title]").textContent = `${level.mark} ${level.name}로 진단되었습니다`;
    diagnosis.querySelector("[data-ai-result-desc]").textContent = level.desc;
    diagnosis.querySelector("[data-ai-result-score]").textContent = `총점 ${total}점 / 36점`;

    diagnosis.querySelector("[data-ai-area-scores]").innerHTML = areas
      .map((area, index) => {
        const percent = Math.round((areaTotals[index] / 9) * 100);
        return `
          <article class="ai-area-card">
            <div><span>${area.name}</span><strong>${areaTotals[index]} / 9점</strong></div>
            <span class="ai-area-bar"><i style="width:${percent}%;background:${area.color}"></i></span>
          </article>
        `;
      })
      .join("");

    diagnosis.querySelector("[data-ai-recommend-list]").innerHTML = level.recommends
      .map(
        (recommend) => `
          <article class="ai-recommend-card">
            <header>
              <span>${recommend.icon}</span>
              <h3>${recommend.label}</h3>
              <b style="background:${recommend.color}22;color:${recommend.color}">${recommend.tag}</b>
            </header>
            <p>${recommend.body}</p>
          </article>
        `,
      )
      .join("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  diagnosis.querySelector("[data-ai-start]").addEventListener("click", () => {
    intro.hidden = true;
    quiz.hidden = false;
    renderQuestion();
  });

  diagnosis.querySelector("[data-ai-prev]").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestion();
    }
  });

  diagnosis.querySelector("[data-ai-next]").addEventListener("click", () => {
    if (answers[currentIndex] === null) return;
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showResult();
    }
  });

  diagnosis.querySelector("[data-ai-retry]").addEventListener("click", () => {
    currentIndex = 0;
    answers = new Array(questions.length).fill(null);
    result.hidden = true;
    intro.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  diagnosis.querySelector("[data-ai-share]").addEventListener("click", async () => {
    const message = `AI 활용능력 진단 결과: ${diagnosis.querySelector("[data-ai-badge-level]").textContent} (${diagnosis.querySelector("[data-ai-result-score]").textContent})`;
    try {
      await navigator.clipboard.writeText(message);
      diagnosis.querySelector("[data-ai-share]").textContent = "복사됨";
      window.setTimeout(() => {
        diagnosis.querySelector("[data-ai-share]").textContent = "결과 복사하기";
      }, 1400);
    } catch {
      alert(message);
    }
  });
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

document.querySelectorAll("[data-detail-tabs]").forEach((tabs) => {
  const tabButtons = Array.from(tabs.querySelectorAll("[data-detail-tab]"));
  const panels = Array.from(tabs.querySelectorAll("[data-detail-panel]"));

  const activateTab = (key, shouldFocus = false) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.detailTab === key;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;

      if (isActive && shouldFocus) {
        button.focus();
      }
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.detailPanel === key;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.detailTab);
      history.replaceState(null, "", `#${button.dataset.detailTab}`);
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
      activateTab(tabButtons[nextIndex].dataset.detailTab, true);
    });
  });

  const activateFromHash = () => {
    const key = window.location.hash.replace("#", "");
    if (tabButtons.some((button) => button.dataset.detailTab === key)) {
      activateTab(key);
    }
  };

  activateFromHash();
  window.addEventListener("hashchange", activateFromHash);
});

document.querySelectorAll(".detail-toc").forEach((toc) => {
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const items = links
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const section = document.getElementById(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!items.length) return;

  let ticking = false;

  const setActiveLink = (activeLink) => {
    items.forEach(({ link }) => {
      const isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveLink = () => {
    const offset = Math.min(180, window.innerHeight * 0.32);
    let current = items[0];

    items.forEach((item) => {
      if (item.section.getBoundingClientRect().top <= offset) {
        current = item;
      }
    });

    setActiveLink(current.link);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveLink);
  };

  links.forEach((link) => {
    link.addEventListener("click", () => setActiveLink(link));
  });

  updateActiveLink();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
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
      href: "beginner-mvp.html",
    },
    {
      max: 4,
      level: "Intermediate",
      title: "Intermediate: AI 에이전트팀으로 서비스형 포트폴리오를 만드세요",
      copy:
        "UX 기획이나 Figma 경험이 있다면 SKILL, PRD, Design.md, QA 리포트를 연결해 다중 화면 포트폴리오를 만드는 흐름이 잘 맞습니다.",
      href: "intermediate.html",
    },
    {
      max: 6,
      level: "Advanced",
      title: "Advanced: 자동으로 업데이트되는 운영 시스템을 설계하세요",
      copy:
        "이미 설계나 화면이 있다면 병렬 에이전트, n8n, GitHub Actions, 코드 에이전트를 연결해 자동화 포트폴리오로 고도화하세요.",
      href: "advanced.html",
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
