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
