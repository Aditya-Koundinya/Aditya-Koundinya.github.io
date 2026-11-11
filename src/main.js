const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function resumeDownloadFilename() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  return `Aditya-Koundinya-resume-${day}-${month}.pdf`;
}

document.querySelectorAll("[data-resume-download]").forEach((link) => {
  link.setAttribute("download", resumeDownloadFilename());
});

const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Hero stagger */
const heroStaggers = document.querySelectorAll(".hero-stagger");
if (prefersReducedMotion) {
  heroStaggers.forEach((el) => el.classList.add("is-in"));
} else {
  heroStaggers.forEach((el, i) => {
    window.setTimeout(() => el.classList.add("is-in"), 80 + i * 70);
  });
}

/* Terminal line reveal */
const terminalLines = document.querySelectorAll(".terminal__body .t-line");
function typeTerminal() {
  if (prefersReducedMotion) {
    terminalLines.forEach((el) => el.classList.add("is-typed"));
    return;
  }
  terminalLines.forEach((el, i) => {
    window.setTimeout(() => el.classList.add("is-typed"), 120 + i * 55);
  });
}

const terminalWindow = document.querySelector(".terminal__window");
if (terminalWindow && "IntersectionObserver" in window) {
  const termObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeTerminal();
          termObserver.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  termObserver.observe(terminalWindow);
} else {
  typeTerminal();
}

/* Case card show more / summary expand */
document.querySelectorAll(".case-card__toggle").forEach((btn) => {
  const card = btn.closest(".case-card");
  const isSummary = card?.classList.contains("case-card--summary");
  if (isSummary) {
    btn.textContent = "Show details";
  }

  btn.addEventListener("click", () => {
    if (!card) return;

    if (isSummary) {
      const open = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Hide details" : "Show details";
      if (open) {
        card.querySelectorAll(".case-card__extra").forEach((extra) => {
          extra.hidden = false;
        });
      } else {
        card.querySelectorAll(".case-card__extra").forEach((extra) => {
          extra.hidden = true;
        });
      }
      return;
    }

    const extra = card.querySelector(".case-card__extra");
    if (!extra) return;
    const open = extra.hidden;
    extra.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Show less" : "Show more";
  });
});

/* Section reveals with cascade delay */
const revealSelectors = [
  ".metric-card",
  ".case-card",
  ".timeline__item",
  ".skill-group",
  ".cert-card",
  ".award-card",
  ".pub-card",
  ".edu-card",
  ".section__header",
];

document.querySelectorAll(revealSelectors.join(",")).forEach((el) => {
  el.classList.add("reveal");
});

document.querySelectorAll(".cases, .metrics__grid, .awards-grid, .skills-grid, .certs-grid, .pub-list, .timeline").forEach((group) => {
  [...group.children].forEach((child, i) => {
    if (child.classList.contains("reveal")) {
      child.style.setProperty("--reveal-delay", `${Math.min(i * 45, 180)}ms`);
    }
  });
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

const header = document.querySelector(".site-header");

window.addEventListener(
  "scroll",
  () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
  },
  { passive: true }
);
