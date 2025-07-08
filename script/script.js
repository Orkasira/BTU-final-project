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
