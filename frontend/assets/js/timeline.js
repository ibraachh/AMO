
const timeline = document.querySelector(".timeline");
let isDown = false;
let startX;
let scrollLeft;

// For desktop
timeline.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - timeline.offsetLeft;
  scrollLeft = timeline.scrollLeft;
});

timeline.addEventListener("mouseleave", () => {
  isDown = false;
});

timeline.addEventListener("mouseup", () => {
  isDown = false;
});

timeline.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - timeline.offsetLeft;
  const walk = (x - startX) * 0.8;
  timeline.scrollLeft = scrollLeft - walk;
});

// For mobile
timeline.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - timeline.offsetLeft;
  scrollLeft = timeline.scrollLeft;
});

timeline.addEventListener("touchend", () => {
  isDown = false;
});

timeline.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - timeline.offsetLeft;
  const walk = (x - startX) * 0.8;
  timeline.scrollLeft = scrollLeft - walk;
});