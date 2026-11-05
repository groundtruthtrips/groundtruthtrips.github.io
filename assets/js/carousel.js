// Progressive enhancement for the gallery carousel: without JavaScript the
// track is still a swipeable / scrollable scroll-snap strip.
document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
  var track = carousel.querySelector(".carousel__track");
  var slides = track.children;
  var controls = carousel.querySelector(".carousel__controls");
  var prev = carousel.querySelector("[data-carousel-prev]");
  var next = carousel.querySelector("[data-carousel-next]");
  var current = carousel.querySelector("[data-carousel-current]");
  if (slides.length < 2) return;

  // Scroll position of each slide within the track (accounts for the gap
  // between slides, which a plain scrollLeft / slideWidth would ignore).
  function slideLeft(i) {
    return slides[i].offsetLeft - slides[0].offsetLeft;
  }

  function index() {
    var best = 0;
    for (var i = 1; i < slides.length; i++) {
      if (Math.abs(slideLeft(i) - track.scrollLeft) < Math.abs(slideLeft(best) - track.scrollLeft)) best = i;
    }
    return best;
  }

  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slideLeft(i), behavior: "smooth" });
  }

  function update() {
    var i = index();
    current.textContent = i + 1;
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
  }

  prev.addEventListener("click", function () { go(index() - 1); });
  next.addEventListener("click", function () { go(index() + 1); });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
  });
  track.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });

  controls.hidden = false;
  update();
});
