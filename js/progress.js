let user = localStorage.getItem("user");
if (!user) window.location.href = "../login.html";

/* REAL COURSE DATA */
let courseData = JSON.parse(localStorage.getItem("courseData")) || {
  web: { progress: 60, completed: false },
  python: { progress: 30, completed: false },
  ui: { progress: 15, completed: false }
};

localStorage.setItem("courseData", JSON.stringify(courseData));

/* DASHBOARD */
if (document.getElementById("webProgress")) {
  document.getElementById("welcomeText").innerText = `Welcome, ${user} 👋`;

  const courses = Object.values(courseData);
  const enrolled = courses.length;
  const completed = courses.filter(c => c.completed).length;
  const overall = Math.round(
    courses.reduce((a, b) => a + b.progress, 0) / courses.length
  );

  document.getElementById("enrolledCount").innerText = enrolled;
  document.getElementById("completedCount").innerText = completed;
  document.getElementById("overallProgress").innerText = overall + "%";

  document.getElementById("webProgress").style.width = courseData.web.progress + "%";
  document.getElementById("pythonProgress").style.width = courseData.python.progress + "%";
  document.getElementById("uiProgress").style.width = courseData.ui.progress + "%";

  document.getElementById("webPercent").innerText = courseData.web.progress + "%";
  document.getElementById("pythonPercent").innerText = courseData.python.progress + "%";
  document.getElementById("uiPercent").innerText = courseData.ui.progress + "%";

  toggleCertButtons();
}

/* OPEN COURSE */
function openCourse(course) {
  localStorage.setItem("selectedCourse", course);
  window.location.href = "course.html";
}

/* COURSE PAGE */
const lessonsMap = {
  web: [
    { title: "HTML Basics", video: "https://www.youtube.com/embed/qz0aGYrrlhU" },
    { title: "CSS Fundamentals", video: "https://www.youtube.com/embed/1PnVor36_40" },
    { title: "JavaScript Intro", video: "https://www.youtube.com/embed/W6NZfCO5SIk" }
  ],
  python: [
    { title: "Python Intro", video: "https://www.youtube.com/embed/_uQrJ0TkZlc" },
    { title: "Data Types", video: "https://www.youtube.com/embed/kqtD5dpn9C8" },
    { title: "Loops", video: "https://www.youtube.com/embed/6iF8Xb7Z3wQ" }
  ],
  ui: [
    { title: "Design Basics", video: "https://www.youtube.com/embed/3YJm8w4r4Z8" },
    { title: "Color Theory", video: "https://www.youtube.com/embed/2J7xlDH4QkA" },
    { title: "Figma Intro", video: "https://www.youtube.com/embed/c9Wg6Cb_YlU" }
  ]
};

let selectedCourse = localStorage.getItem("selectedCourse");
let currentLesson = 0;

if (document.getElementById("lessonList") && selectedCourse) {
  const lessons = lessonsMap[selectedCourse];

  document.getElementById("courseTitle").innerText =
    selectedCourse.toUpperCase() + " Course";

  lessons.forEach((lesson, i) => {
    const li = document.createElement("li");
    li.innerText = lesson.title;
    li.onclick = () => loadLesson(i);
    document.getElementById("lessonList").appendChild(li);
  });

  loadLesson(0);
}

function loadLesson(index) {
  currentLesson = index;
  const lessons = lessonsMap[selectedCourse];

  document.getElementById("courseVideo").src = lessons[index].video;

  document.querySelectorAll(".lesson-list li").forEach(li =>
    li.classList.remove("active")
  );
  document.querySelectorAll(".lesson-list li")[index].classList.add("active");
}

function markCompleted() {
  if (!selectedCourse) return;

  courseData[selectedCourse].progress += 10;
  if (courseData[selectedCourse].progress >= 100) {
    courseData[selectedCourse].progress = 100;
    courseData[selectedCourse].completed = true;
  }

  localStorage.setItem("courseData", JSON.stringify(courseData));
  alert("Lesson Completed!");
}

/* CERTIFICATE RULE */
function toggleCertButtons() {
  document.querySelectorAll(".course-card").forEach(card => {
    const course = card.querySelector("h3").innerText.toLowerCase().includes("web")
      ? "web"
      : card.querySelector("h3").innerText.toLowerCase().includes("python")
      ? "python"
      : "ui";

    if (courseData[course].completed) {
      let btn = document.createElement("button");
      btn.className = "course-btn";
      btn.innerText = "🎓 Get Certificate";
      btn.onclick = () => {
        localStorage.setItem("certCourse", course);
        window.location.href = "certificate.html";
      };
      card.appendChild(btn);
    }
  });
}

function logout() {
  localStorage.clear();
  window.location.href = "../login.html";
}
/* BADGES LOGIC */
if (document.getElementById("badgeGrid")) {
  const badgeGrid = document.getElementById("badgeGrid");

  const badges = [
    { name: "First Course", icon: "🎉", rule: courseData.web.progress > 0 },
    { name: "Web Master", icon: "💻", rule: courseData.web.completed },
    { name: "Python Pro", icon: "🐍", rule: courseData.python.completed },
    { name: "Designer", icon: "🎨", rule: courseData.ui.completed },
    { name: "All Rounder", icon: "🏆", rule: Object.values(courseData).every(c => c.completed) }
  ];

  badges.forEach(badge => {
    const div = document.createElement("div");
    div.className = "badge-card " + (badge.rule ? "" : "locked");
    div.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <h4>${badge.name}</h4>
    `;
    badgeGrid.appendChild(div);
  });
}
/* THEME TOGGLE */
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode"));
}

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("light-mode");
}
/* =========================
   PHASE 9 — ANALYTICS CHART (FIXED)
========================= */

if (document.getElementById("progressChart")) {
  const ctx = document.getElementById("progressChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Web Development", "Python", "UI/UX"],
      datasets: [{
        label: "Progress %",
        data: [
          courseData.web.progress,
          courseData.python.progress,
          courseData.ui.progress
        ],
        backgroundColor: [
          "#7c3aed",
          "#22c55e",
          "#0ea5e9"
        ],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: { size: 12 }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: "white",
            stepSize: 20,
            font: { size: 11 }
          },
          grid: {
            color: "rgba(255,255,255,0.08)"
          }
        },
        x: {
          ticks: {
            color: "white",
            font: { size: 12 }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}
