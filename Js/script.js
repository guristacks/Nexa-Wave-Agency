// Gsap Timeline
let tl = gsap.timeline();

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
  }

  const destroyLenis = () => {
    if (lenis) {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      lenis = null;
    }
  }

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

  tl.from(".hero", {
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
      duration: 0.3
    });
  }

  tl.from("header .logo", {
    y: -20,
    opacity: 0,
    duration: 0.3
  });

  if (window.innerWidth > 1024) {
    tl.from("ul li a", {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.2
    });
  }

  tl.from(".hero-content .p1", {
    y: -30,
    duration: 0.3,
    opacity: 0
  });

  tl.from(".hero-content h1", {
    y: -30,
    duration: 0.3,
    opacity: 0
  });

  tl.from(".hero-content .p2", {
    y: -30,
    duration: 0.3,
    opacity: 0
  });

  tl.from(".btn-set", {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
  });
};

const navBarAnimation = () => {
  let menuBtn = document.querySelector(".ri-menu-4-line");
  let closeBtn = document.querySelector(".ri-close-large-fill");
  let header = document.querySelector("header");

  menuBtn.addEventListener("click", () => {
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

  closeBtn.addEventListener("click", () => {
    header.classList.remove("add");
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  });
};

const brandsAnimation = () => {
  if (window.innerWidth > 1024) {
    gsap.to(".track", {
    x: "-60%",
    duration:20,
    repeat: -1,
    yoyo: true,
    ease: "none",
  })
  } else if (window.innerWidth < 768) {
    gsap.to(".track", {
    x: "-80%",
    duration:20,
    repeat: -1,
    yoyo: true,
    ease: "none",
  })
  }

}

lenisAnimation();

loadingAnimation();

navBarAnimation();

brandsAnimation();
