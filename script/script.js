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

    // ლინკზე დაჭერით მენიუ დაიხუროს
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        closeMenu();
      });
    });

    // მენიუს გარეთ დაკლიკებისას დაიხუროს მენიუ
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        closeMenu();
      }
    });
    // ფანჯრის ზომის შეცვლისას მენიუ დაიხუროს
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
  if (window.scrollY > 600) {
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

// Privacy Policy Banner
const popup = document.getElementById("privacy-banner");
const acceptBtn = document.getElementById("accept-privacy");
const declineBtn = document.getElementById("decline-privacy");

const PRIVACY_KEY = "PRIVACYConsentTime";

function shouldShowPopup() {
  const storedTime = localStorage.getItem(PRIVACY_KEY);
  if (!storedTime) return true;

  const lastConsentTime = parseInt(storedTime, 10);
  const currentTime = new Date().getTime();

  return currentTime - lastConsentTime > 60000; // 1 minute
}

// Show/hide popup
function showPopup() {
  popup.style.display = "block";
}

function hidePopup() {
  popup.style.display = "none";
}

// On "I Agree"
acceptBtn.addEventListener("click", () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(PRIVACY_KEY, currentTime.toString());
  hidePopup();
});

// On "I Disagree"
declineBtn.addEventListener("click", () => {
  window.location.href = "https://google.com";
});

// On page load
window.addEventListener("load", () => {
  if (shouldShowPopup()) {
    showPopup();
  }
});
