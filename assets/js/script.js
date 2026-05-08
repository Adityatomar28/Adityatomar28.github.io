// updated
// updated
// add this at top of file
// updated by Aditya
$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    // scroll spy
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear",
    );
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Aditya Singh Tomar";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "assets/images/favhand.png");
  }
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["Backend Development", "GenAI &amp; LLMs", "Web Development"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
  let response;
  type === "skills"
    ? (response = await fetch("skills.json"))
    : (response = await fetch("./projects/projects.json"));
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach((category) => {
    let skillsListHTML = "";
    category.skills.forEach((skill) => {
      skillsListHTML += `
            <div class="tech-item">
              <img src="${skill.icon}" alt="skill" />
              <span>${skill.name}</span>
            </div>`;
    });

    skillHTML += `
        <div class="tech-card">
            <div class="tech-header">
                <span class="dot" style="background-color: ${category.dotColor}; color: ${category.dotColor}; box-shadow: 0 0 10px currentColor;"></span>
                <span class="category-name" style="color: ${category.dotColor};">${category.category}</span>
            </div>
            <div class="tech-grid">
                ${skillsListHTML}
            </div>
        </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 10)
    .filter((project) => project.category != "android")
    .forEach((project) => {
      let viewBtn = "";
      if (project.links.view && project.links.view.trim() !== "") {
        viewBtn = `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`;
      }

      projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            ${viewBtn}
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { interval: 200 });
}

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->

// pre loader start
function loader() {
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    loaderContainer.classList.add("fade-out");
  }
}
function fadeOut() {
  const loaderContainer = document.querySelector(".loader-container");
  if (sessionStorage.getItem("loader-shown")) {
    // For repeat visits, make it shorter (1.2s) but solid (no translucent flash)
    loaderContainer.classList.add("no-transition");
    setTimeout(loader, 1200);
  } else {
    sessionStorage.setItem("loader-shown", "true");
    setTimeout(loader, 2800);
  }
}
window.addEventListener("load", fadeOut);
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};
async function fetchLeetCodeStats() {
  try {
    const response = await fetch(
      "https://alfa-leetcode-api.onrender.com/A_S_02/solved",
    );
    const data = await response.json();
    if (data && data.solvedProblem) {
      return {
        total: data.solvedProblem,
        easy: data.easySolved,
        medium: data.mediumSolved,
        hard: data.hardSolved,
        easyPercent:
          ((data.easySolved / data.solvedProblem) * 100).toFixed(1) + "%",
        mediumPercent:
          ((data.mediumSolved / data.solvedProblem) * 100).toFixed(1) + "%",
        hardPercent:
          ((data.hardSolved / data.solvedProblem) * 100).toFixed(1) + "%",
      };
    }
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
  }
  return null;
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
srtop.reveal(".home .twitter", { interval: 1000 });
srtop.reveal(".home .telegram", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal(".skills .container", { interval: 200 });
srtop.reveal(".skills .container .bar", { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal(".work .box", { interval: 200 });

/* SCROLL ACHIEVEMENTS TIMELINE */
srtop.reveal(".achievements .timeline", { delay: 400 });
srtop.reveal(".achievements .timeline .container", { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });

/* ACHIEVEMENTS ANIMATION */
document.addEventListener("DOMContentLoaded", async () => {
  const achievementsContainer = document.querySelector(
    ".achievements-container",
  );
  const counter = document.querySelector(".achievements-container .counter");
  const progressBars = document.querySelectorAll(
    ".achievements-container .progress-bar",
  );
  const counts = document.querySelectorAll(".achievements-container .count");
  let hasAnimated = false;

  // Fetch live data
  const stats = await fetchLeetCodeStats();
  if (stats) {
    if (counter) counter.setAttribute("data-target", stats.total);
    if (counts.length >= 3) {
      counts[0].innerText = stats.easy;
      counts[1].innerText = stats.medium;
      counts[2].innerText = stats.hard;
    }
    if (progressBars.length >= 3) {
      progressBars[0].setAttribute("data-width", stats.easyPercent);
      progressBars[1].setAttribute("data-width", stats.mediumPercent);
      progressBars[2].setAttribute("data-width", stats.hardPercent);
    }
  }

  const animateOnScroll = () => {
    if (!achievementsContainer || hasAnimated) return;

    const sectionTop = achievementsContainer.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (sectionTop < triggerPoint) {
      hasAnimated = true;

      // 1. Counter Animation
      if (counter) {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          const easeOut = progress * (2 - progress);
          counter.innerText = Math.floor(easeOut * target);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };
        requestAnimationFrame(updateCounter);
      }

      // 2. Progress Bars Animation
      progressBars.forEach((bar, index) => {
        setTimeout(() => {
          const targetWidth = bar.getAttribute("data-width");
          bar.style.width = targetWidth;
        }, index * 200);
      });
    }
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});
// Cursor Animation
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline) {
  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  });

  document
    .querySelectorAll("a, button, .box, .tech-card, .tech-item")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px";
        cursorOutline.style.height = "60px";
        cursorOutline.style.backgroundColor = "rgba(255, 174, 0, 0.1)";
      });
      el.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
      });
    });
}

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop redirect

    const data = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;

    btn.innerHTML = "Sending... <i class='fa fa-spinner fa-spin'></i>";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        btn.innerHTML = "Sent! <i class='fa fa-check-circle'></i>";
        btn.style.background = "#059669";
        setTimeout(() => {
          btn.innerHTML = originalBtnText;
          btn.style.background = "";
        }, 3000);
        form.reset();
      } else {
        btn.innerHTML = "Failed <i class='fa fa-times-circle'></i>";
        btn.style.background = "#dc2626";
        setTimeout(() => {
          btn.innerHTML = originalBtnText;
          btn.style.background = "";
        }, 3000);
      }
    } catch (error) {
      btn.innerHTML = "Error <i class='fa fa-exclamation-triangle'></i>";
      btn.style.background = "#dc2626";
      setTimeout(() => {
        btn.innerHTML = originalBtnText;
        btn.style.background = "";
      }, 3000);
    }
  });
}

// Resume Modal Functionality

document.addEventListener("DOMContentLoaded", () => {
  const resumeModal = document.getElementById("resume-modal");
  const resumeBtn = document.getElementById("resume-preview-btn");
  const closeResume = document.querySelector(".close-modal");

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener("click", () => {
      resumeModal.style.display = "block";
      setTimeout(() => {
        resumeModal.classList.add("show");
      }, 10);
      document.body.style.overflow = "hidden";
    });
  }

  if (closeResume && resumeModal) {
    closeResume.addEventListener("click", () => {
      resumeModal.classList.remove("show");
      setTimeout(() => {
        resumeModal.style.display = "none";
      }, 300);
      document.body.style.overflow = "auto";
    });
  }

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove("show");
      setTimeout(() => {
        resumeModal.style.display = "none";
      }, 300);
      document.body.style.overflow = "auto";
    }
  });
});
