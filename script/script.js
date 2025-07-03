// frequently სექციაზე კლიკის დროს ტექსტის ჩამოშლა

document.querySelectorAll(".frequently-card").forEach((item) => {
  item.querySelector(".frequently-nums").addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    if (isActive) {
      item.classList.remove("active");
      item.querySelector(".btn").textContent = "+";
    }

    if (!isActive) {
      item.classList.add("active");
      item.querySelector(".btn").textContent = "x";
    }
  });
});

// scroll to top

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Function to show/hide button based on scroll
function toggleScrollBtn() {
  if (window.scrollY > 600) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Run when scrolling
window.addEventListener("scroll", toggleScrollBtn);

// ALSO run once on page load (to fix button showing after refresh)
window.addEventListener("load", toggleScrollBtn);

// Scroll to top smoothly on click
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
