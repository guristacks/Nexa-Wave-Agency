/*---------------------
 LENIS ONLY FOR DESKTOP
-------------------- */

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

/*------------
   GSAP TIMELINE
  ------------*/

  let tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.5 },
  });
