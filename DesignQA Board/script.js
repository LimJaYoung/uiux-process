const { projects, screens, issues, checklistItems, reportRows } = window.designQaData;

const statusLabels = {
  todo: "해야 함",
  doing: "진행중",
  done: "완료",
};

const priorityLabels = {
  high: "높음",
  medium: "중간",
  low: "낮음",
};

const priorityClass = {
  high: "danger",
  medium: "warning",
  low: "info",
};

const statusClass = {
  검토중: "warning",
  막힘: "danger",
  "공유 준비": "success",
  완료: "success",
  대기: "info",
};

const viewLinks = document.querySelectorAll("[data-view-link]");
const views = document.querySelectorAll("[data-view]");
const issueBoard = document.querySelector("#issueBoard");
const recentIssues = document.querySelector("#recentIssues");
const emptyIssues = document.querySelector("#emptyIssues");
const issueSearch = document.querySelector("#issueSearch");
const statusFilter = document.querySelector("#statusFilter");
const priorityFilter = document.querySelector("#priorityFilter");
const checklist = document.querySelector("#checklist");
const checklistStatus = document.querySelector("#checklistStatus");
const progressValue = document.querySelector("#progressValue");
const openIssueCount = document.querySelector("#openIssueCount");
const highIssueCount = document.querySelector("#highIssueCount");
const toast = document.querySelector("#toast");
const issueModal = document.querySelector("#issueModal");
const issueTitle = document.querySelector("#issueTitle");
const issuePriority = document.querySelector("#issuePriority");

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.toggle("danger", type === "error");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

function setView(viewName) {
  views.forEach((view) => {
    view.classList.toggle("is-visible", view.dataset.view === viewName);
  });

  viewLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.viewLink === viewName);
  });
}

function getFilteredIssues() {
  const query = issueSearch.value.trim().toLowerCase();
  const status = statusFilter.value;
  const priority = priorityFilter.value;

  return issues.filter((issue) => {
    const matchesQuery = [issue.title, issue.screen, issue.owner].some((value) =>
      value.toLowerCase().includes(query),
    );
    const matchesStatus = status === "all" || issue.status === status;
    const matchesPriority = priority === "all" || issue.priority === priority;
    return matchesQuery && matchesStatus && matchesPriority;
  });
}

function createIssueCard(issue) {
  const card = document.createElement("article");
  card.className = "issue-card";
  card.innerHTML = `
    <header>
      <strong>${issue.title}</strong>
      <span class="status-pill ${priorityClass[issue.priority]}">${priorityLabels[issue.priority]}</span>
    </header>
    <p>${issue.screen} / 담당자: ${issue.owner}</p>
  `;
  return card;
}

function renderProjects() {
  document.querySelectorAll("[data-project-grid]").forEach((grid) => {
    grid.innerHTML = projects
      .map(
        (project) => `
          <article class="project-card">
            <span class="status-pill ${statusClass[project.status] || "info"}">${project.status}</span>
            <h3>${project.name}</h3>
            <p>${project.memo}</p>
            <strong>${project.progress}%</strong>
            <small>${project.owner} / ${project.screens}개 화면</small>
          </article>
        `,
      )
      .join("");
  });
}

function renderScreens() {
  const markup = screens
    .map(
      (screen, index) => `
        <button class="screen-row ${index === 0 ? "is-selected" : ""}" type="button">
          <span>
            <strong>${screen.name}</strong>
            <small>체크리스트 ${screen.checklist}개</small>
          </span>
          <span class="status-pill ${screen.status}">${index === 0 ? "검토중" : "확인"}</span>
        </button>
      `,
    )
    .join("");
  document.querySelector("#screenList").innerHTML = markup;
  document.querySelector("#screenListCopy").innerHTML = markup;
}

function renderBoard() {
  const filtered = getFilteredIssues();
  issueBoard.innerHTML = "";
  emptyIssues.hidden = filtered.length !== 0;

  ["todo", "doing", "done"].forEach((status) => {
    const column = document.createElement("section");
    column.className = "board-column";
    column.innerHTML = `<h3>${statusLabels[status]}</h3>`;

    filtered
      .filter((issue) => issue.status === status)
      .forEach((issue) => column.appendChild(createIssueCard(issue)));

    issueBoard.appendChild(column);
  });
}

function renderRecentIssues() {
  recentIssues.innerHTML = "";
  issues.slice(0, 3).forEach((issue) => {
    recentIssues.appendChild(createIssueCard(issue));
  });
}

function renderMetrics() {
  openIssueCount.textContent = issues.filter((issue) => issue.status !== "done").length;
  highIssueCount.textContent = issues.filter((issue) => issue.priority === "high").length;
}

function renderChecklist() {
  checklist.innerHTML = "";
  checklistItems.forEach((item, index) => {
    const label = document.createElement("label");
    label.className = "check-row";
    label.innerHTML = `
      <input type="checkbox" ${index < 2 ? "checked" : ""} />
      <span>${item}</span>
    `;
    checklist.appendChild(label);
  });
  updateChecklistProgress();
}

function renderReport() {
  document.querySelector("#reportRows").innerHTML = reportRows
    .map(
      ([screen, open, high, status, memo]) => `
        <tr>
          <td>${screen}</td>
          <td>${open}</td>
          <td>${high}</td>
          <td><span class="status-pill ${statusClass[status] || "info"}">${status}</span></td>
          <td>${memo}</td>
        </tr>
      `,
    )
    .join("");
}

function updateChecklistProgress() {
  const checks = checklist.querySelectorAll("input");
  const checked = checklist.querySelectorAll("input:checked").length;
  const percent = Math.round((checked / checks.length) * 100);
  checklistStatus.textContent = `${checked}/${checks.length}개 완료`;
  progressValue.textContent = `${percent}%`;
}

viewLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const viewName = link.dataset.viewLink;
    history.replaceState(null, "", `#${viewName}`);
    setView(viewName);
  });
});

[issueSearch, statusFilter, priorityFilter].forEach((control) => {
  control.addEventListener("input", renderBoard);
});

checklist.addEventListener("change", updateChecklistProgress);

document.querySelector("[data-open-modal]").addEventListener("click", () => {
  issueModal.showModal();
  issueTitle.focus();
});

document.querySelector("#saveIssue").addEventListener("click", (event) => {
  event.preventDefault();
  const title = issueTitle.value.trim() || "모달에서 등록한 새 QA 이슈";
  issues.unshift({
    id: Date.now(),
    title,
    screen: "화면 QA 상세",
    owner: "지영",
    status: "todo",
    priority: issuePriority.value,
  });
  issueTitle.value = "";
  issueModal.close();
  renderMetrics();
  renderRecentIssues();
  renderBoard();
  showToast("이슈가 등록되었고 보드에 반영되었습니다.");
});

document.querySelector("#simulateError").addEventListener("click", () => {
  showToast("저장에 실패했습니다. 이슈 상태를 확인하고 다시 시도하세요.", "error");
});

document.querySelector("#generateReport").addEventListener("click", () => {
  showToast("멘토 리뷰용 QA 리포트가 생성되었습니다.");
});

const initialView = location.hash.replace("#", "") || "dashboard";
setView(document.querySelector(`[data-view="${initialView}"]`) ? initialView : "dashboard");
renderProjects();
renderScreens();
renderChecklist();
renderMetrics();
renderRecentIssues();
renderReport();
renderBoard();
