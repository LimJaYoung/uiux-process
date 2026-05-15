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
