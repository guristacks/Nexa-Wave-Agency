// Gsap Timeline
let tl = gsap.timeline({
  defaults: { ease: "power2.out", duration: 0.5 },
});

const lenisAnimation = () => {
  let lenis;
  let rafFn;

  function initLenis() {
    if (window.innerWidth > 1024 && !lenis) {
      lenis = new Lenis({ duration: 1.2 });

      lenis.on("scroll", ScrollTrigger.update);

      rafFn = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
    }
  }

  function destroyLenis() {
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

const navBarAnimation = () => {
  let menuBtn = document.querySelector(".ri-menu-4-line");
  let closeBtn = document.querySelector(".ri-close-large-fill");
  let header = document.querySelector("header");

  menuBtn.addEventListener("click", () => {
    header.classList.add("add");
    menuBtn.style.display = "none";
    closeBtn.style.display = "block";

    tl.to(header, {
      height: "fit-content",
    });

    tl.from(".navCol h2", {
      y: -30,
      x: -30,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    });
  });

  closeBtn.addEventListener("click", () => {
    header.classList.remove("add");
    header.style.height = "4rem";
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
  });
};

lenisAnimation();

navBarAnimation();
