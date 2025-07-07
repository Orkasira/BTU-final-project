// burgerBar
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');

  function openMenu() {
    burger.classList.add('open');
    nav.classList.add('open');
  }

  function closeMenu() {
    burger.classList.remove('open');
    nav.classList.remove('open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // ლინკზე დაჭერით მენიუ დაიხუროს
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        closeMenu();
      });
    });

    // მენიუს გარეთ დაკლიკებისას დაიხუროს მენიუ
    document.addEventListener('click', function(e) {
      if (
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        closeMenu();
      }
    });
    // ფანჯრის ზომის შეცვლისას მენიუ დაიხუროს
    window.addEventListener('resize', function() {
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
