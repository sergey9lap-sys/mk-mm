const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.querySelectorAll(".hero__copy > *").forEach((element, index) => {
    element.animate(
      [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 1450, delay: 180 + index * 130, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
    );
  });
  document.querySelector(".hero__portrait")?.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 1800, delay: 1800, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 1500, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" }
      );
      [...entry.target.children].forEach((child, index) => child.animate(
        [{ opacity: .35, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 1250, delay: 160 + index * 115, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
      ));
      entry.target.querySelectorAll("h2, h3").forEach((heading, index) => heading.animate(
        [{ opacity: 0, clipPath: "inset(0 100% 0 0)", transform: "translateY(10px)" }, { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translateY(0)" }],
        { duration: 1400, delay: 220 + index * 90, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
      ));
      entry.target.querySelectorAll(".problems article, .steps article, .curriculum__list article, .tariff-card, .bonus-grid article, .facts span, .confidence__list p, .premium__receipt p, .care__channels a").forEach((card, index) => card.animate(
        [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 1300, delay: 320 + index * 120, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
      ));
      observer.unobserve(entry.target);
    });
  }, { threshold: .06, rootMargin: "0px 0px -5%" });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else document.querySelectorAll(".reveal").forEach((element) => element.classList.remove("reveal"));

const slider = document.querySelector("[data-slider]");
if (slider) {
  const track = slider.querySelector(".slider__track");
  const slides = [...track.children];
  const count = slider.querySelector("[data-count]");
  let current = 0;
  const render = () => { track.style.transform = `translateX(-${current * 100}%)`; count.textContent = `${String(current + 1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`; };
  const move = (step) => { current = (current + step + slides.length) % slides.length; render(); };
  slider.querySelector("[data-prev]").addEventListener("click", () => move(-1));
  slider.querySelector("[data-next]").addEventListener("click", () => move(1));
  slider.addEventListener("keydown", (event) => { if(event.key === "ArrowLeft") move(-1); if(event.key === "ArrowRight") move(1); });
}

const cookie = document.querySelector("[data-cookie]");
if (cookie && localStorage.getItem("rekurrent-cookie-consent") !== "accepted") cookie.hidden = false;
cookie?.querySelectorAll("[data-cookie-accept]").forEach((button) => button.addEventListener("click", () => {
  localStorage.setItem("rekurrent-cookie-consent", "accepted");
  cookie.hidden = true;
}));

const widgetModals = [...document.querySelectorAll("[data-widget-modal]")];
let activeWidgetModal = null;
let widgetTrigger = null;

const closeWidgetModal = () => {
  if (!activeWidgetModal) return;
  activeWidgetModal.classList.remove("is-open");
  activeWidgetModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-modal");
  widgetTrigger?.focus({ preventScroll: true });
  activeWidgetModal = null;
};

document.querySelectorAll("[data-widget-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const modal = document.querySelector(`[data-widget-modal="${trigger.dataset.widgetOpen}"]`);
    if (!modal) return;
    event.preventDefault();
    widgetTrigger = trigger;
    activeWidgetModal = modal;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-modal");
    modal.querySelector(".gc-popup__close")?.focus({ preventScroll: true });
  });
});

widgetModals.forEach((modal) => modal.querySelectorAll("[data-widget-close]").forEach((button) => button.addEventListener("click", closeWidgetModal)));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeWidgetModal(); });
