// Gsap Timeline & Scroll Trigger
let tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

const onPress = (el, handler) => {
  if (!el) return;
  el.addEventListener("click", handler);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler(e);
    }
  });
};

const debounce = (fn, wait = 150) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

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

  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth > 1024) {
        initLenis();
      } else {
        destroyLenis();
      }
    }, 200),
    { passive: true },
  );
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
  const openMenu = (e) => {
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
  };
  onPress(menuBtn, openMenu);

  // CLOSE MENU (icon)
  const closeMenu = () => {
    header.classList.remove("add");
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  };

  const closeMenuFromEvent = (e) => {
    e.stopPropagation();
    closeMenu();
  };
  onPress(closeBtn, closeMenuFromEvent);

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

const contactForm = () => {
  const form = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#submit");
  const inputs = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    inputs.forEach((input) => {
      const value = input.value.trim();
      const label = input.previousElementSibling;

      // reset error state
      input.classList.remove("error");
      label.classList.remove("error");

      // ❌ Empty check
      if (value === "") {
        input.classList.add("error");
        label.classList.add("error");
        isValid = false;
      }

      // ❌ Email validation
      if (input.type === "email" && value !== "") {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
        if (!emailPattern.test(value)) {
          input.classList.add("error");
          label.classList.add("error");
          isValid = false;
        }
      }

      // ❌ Phone validation (10–15 digits)
      if (input.type === "tel" && value !== "") {
        const phonePattern = /^[0-9]{10,15}$/;
        if (!phonePattern.test(value)) {
          input.classList.add("error");
          label.classList.add("error");
          isValid = false;
        }
      }
    });

    // ❌ agar invalid hai toh yahi ruk jao
    if (!isValid) return;

    // ✅ agar sab valid hai tab submit animation
    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.value = "Message Sent ✓";
      form.reset();

      setTimeout(() => {
        submitBtn.value = "Submit";
        submitBtn.disabled = false;
      }, 2000);
    }, 1000);
  });

  // ✅ live error remove (typing pe hi red hat jaaye)
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const label = input.previousElementSibling;
      input.classList.remove("error");
      label.classList.remove("error");
    });
  });
};

lenisAnimation();

loadingAnimation();

navBarAnimation();

contactForm();