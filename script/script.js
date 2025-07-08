// burgerBar
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("mainNav");

  function openMenu() {
    burger.classList.add("open");
    nav.classList.add("open");
  }

  function closeMenu() {
    burger.classList.remove("open");
    nav.classList.remove("open");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      if (nav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        closeMenu();
      });
    });

    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    });
  }
});

// frequently სექციაზე კლიკის დროს ტექსტის ჩამოშლა

document.querySelectorAll(".frequently-card").forEach((item) => {
  item.querySelector(".frequently-nums").addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".frequently-card").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".btn").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      item.querySelector(".btn").textContent = "x";
    }
  });
});

// scroll to top

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

function toggleScrollBtn() {
  if (window.scrollY > 700) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

window.addEventListener("scroll", toggleScrollBtn);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Privacy Banner cookie logic
window.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("privacy-banner");
  const overlay = document.getElementById("privacy-overlay");
  const accept = document.getElementById("accept-privacy");
  const decline = document.getElementById("decline-privacy");

  const PRIVACY_KEY = "PRIVACYConsentTime";
  const ACCEPTED_KEY = "privacyAccepted";

  function showPrivacyPopup() {
    if (banner) banner.style.display = "block";
    if (overlay) overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function hidePrivacyPopup() {
    if (banner) banner.style.display = "none";
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "";
  }

  function shouldShowPopup() {
    const storedTime = localStorage.getItem(PRIVACY_KEY);
    if (!storedTime) return true;
    const lastConsentTime = parseInt(storedTime, 10);
    const currentTime = new Date().getTime();
    return currentTime - lastConsentTime > 60000; // 1 minute
  }

  function acceptPrivacy() {
    const currentTime = new Date().getTime();
    localStorage.setItem(PRIVACY_KEY, currentTime.toString());
    hidePrivacyPopup();
  }

  function declinePrivacy() {
    hidePrivacyPopup();
    window.location.href = "https://google.com";
  }

  if (accept) accept.onclick = acceptPrivacy;
  if (decline) decline.onclick = declinePrivacy;

  if (shouldShowPopup()) {
    showPrivacyPopup();
  }
});

// password visibility toggle

document.addEventListener("DOMContentLoaded", function () {
  const password = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  if (togglePassword && password) {
    togglePassword.addEventListener("click", function () {
      if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
      } else {
        password.type = "password";
        togglePassword.textContent = "Show";
      }
    });
  }
});

//budget value slider
document.addEventListener("DOMContentLoaded", function () {
  const budgetInput = document.getElementById("budget");
  const budgetValue = document.getElementById("budget-value");
  if (budgetInput && budgetValue) {
    function setBudgetValuePosition() {
      const min = parseInt(budgetInput.min, 10);
      const max = parseInt(budgetInput.max, 10);
      const val = parseInt(budgetInput.value, 10);
      const percent = (val - min) / (max - min);
      const thumbWidth = 32;
      budgetValue.style.left = `calc(${percent * 100}% - ${thumbWidth / 2}px)`;
      budgetValue.textContent = `$${val}`;
    }
    function updateOnEvent() {
      requestAnimationFrame(setBudgetValuePosition);
    }
    setBudgetValuePosition();
    budgetInput.addEventListener("input", updateOnEvent);
    budgetInput.addEventListener("mousedown", updateOnEvent);
    budgetInput.addEventListener("mousemove", updateOnEvent);
    budgetInput.addEventListener("touchstart", updateOnEvent);
    budgetInput.addEventListener("touchmove", updateOnEvent);
    window.addEventListener("resize", updateOnEvent);
  }
});

// Dual-thumb budget slider
document.addEventListener("DOMContentLoaded", function () {
  const minInput = document.getElementById("budget-min");
  const maxInput = document.getElementById("budget-max");
  const minValue = document.getElementById("budget-value-min");
  const maxValue = document.getElementById("budget-value-max");
  const rangeTrack = document.querySelector(".range-track");
  if (minInput && maxInput && minValue && maxValue && rangeTrack) {
    const minGap = 1;
    function setBudgetPositions(e) {
      let min = parseInt(minInput.value, 10);
      let max = parseInt(maxInput.value, 10);
      const minLimit = parseInt(minInput.min, 10);
      const maxLimit = parseInt(maxInput.max, 10);

      if (e && e.target === minInput && min > max - minGap) {
        min = max - minGap;
        minInput.value = min;
      }
      if (e && e.target === maxInput && max < min + minGap) {
        max = min + minGap;
        maxInput.value = max;
      }
      if (min > max - minGap) {
        min = max - minGap;
        minInput.value = min;
      }
      if (max < min + minGap) {
        max = min + minGap;
        maxInput.value = max;
      }

      const range = maxLimit - minLimit;
      const minPercent = ((min - minLimit) / range) * 100;
      const maxPercent = ((max - minLimit) / range) * 100;

      rangeTrack.style.setProperty("--min", minPercent + "%");
      rangeTrack.style.setProperty("--max", maxPercent + "%");

      minInput.style.top = "45%";
      minInput.style.transform = "translateY(-0%)";
      maxInput.style.top = "50%";
      maxInput.style.transform = "translateY(-50%)";

      minValue.style.left = `calc(${minPercent}% - 16px)`;
      maxValue.style.left = `calc(${maxPercent}% - 16px)`;
      minValue.style.top = "40px";
      maxValue.style.top = "40px";
      minValue.textContent = `$${min}`;
      maxValue.textContent = `$${max}`;
    }
    setBudgetPositions();
    minInput.addEventListener("input", setBudgetPositions);
    maxInput.addEventListener("input", setBudgetPositions);
    window.addEventListener("resize", setBudgetPositions);
  }
});

// Contact form validation
