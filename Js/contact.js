// Gsap Timeline & Scroll Trigger
let tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

const lenisAnimation = () => {
  let lenis;
  let rafFn;

  const initLenis = () => {
    if (window.innerWidth > 1024 && !lenis) {
      lenis = new Lenis({ duration: 2 });

      lenis.on("scroll", ScrollTrigger.update);

      rafFn = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
    }
  };

  const destroyLenis = () => {
    if (lenis) {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      lenis = null;
    }
  };

  initLenis();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      initLenis();
    } else {
      destroyLenis();
    }
  });
};

const loadingAnimation = () => {
  tl.from(".contact", {
    delay: 0.5,
    opacity: 0,
    duration: 0.5,
  });

  tl.from("header", {
    y: -30,
    opacity: 0,
    duration: 0.3,
  });

  if (window.innerWidth < 1024) {
    tl.from("header i", {
      y: -20,
      opacity: 0,
      duration: 0.3,
    });
  }

  tl.from("header .logo", {
    y: -20,
    opacity: 0,
    duration: 0.3,
  });

  if (window.innerWidth > 1024) {
    tl.from("ul li a", {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
    });
  }

  tl.from(".contact-content h2", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".contact-content h1", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".contact-content .allp", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });

  tl.from(".form-content", {
    y: -30,
    duration: 0.3,
    opacity: 0,
  });
};

const navBarAnimation = () => {
  let menuBtn = document.querySelector(".ri-menu-4-line");
  let closeBtn = document.querySelector(".ri-close-large-fill");
  let header = document.querySelector("header");
  let navCol = document.querySelector(".navCol");
  let navLinks = document.querySelectorAll(".navCol a");

  // OPEN MENU
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // important
    header.classList.add("add");
    menuBtn.style.display = "none";
    closeBtn.style.display = "block";

    gsap.from(".navCol h2", {
      delay: 0.1,
      y: -30,
      x: -30,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    });
  });

  // CLOSE MENU (icon)
  const closeMenu = () => {
    header.classList.remove("add");
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  };

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // ✅ 1. Outside click
  document.addEventListener("click", (e) => {
    if (
      header.classList.contains("add") &&
      !navCol.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ✅ 2. Nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
};

lenisAnimation();

loadingAnimation();

navBarAnimation();

