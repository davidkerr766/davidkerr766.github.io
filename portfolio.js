const smoothScroll = (element) => {
  const MIN_PIXELS_PER_STEP = 16;
  const MAX_SCROLL_STEPS = 30;
  let target = document.querySelector(element);
  let scrollContainer = target;
  do {
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do {
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while ((target = target.offsetParent));

  var pixelsPerStep = Math.max(
    MIN_PIXELS_PER_STEP,
    (targetY - scrollContainer.scrollTop) / MAX_SCROLL_STEPS
  );

  var stepFunc = function () {
    scrollContainer.scrollTop = Math.min(
      targetY,
      pixelsPerStep + scrollContainer.scrollTop
    );

    if (scrollContainer.scrollTop >= targetY) {
      return;
    }

    window.requestAnimationFrame(stepFunc);
  };

  window.requestAnimationFrame(stepFunc);
};

var cursor = true;
var speed = 500;
setInterval(() => {
  if (cursor) {
    document.getElementById("cursor").style.opacity = 0;
    cursor = false;
  } else {
    document.getElementById("cursor").style.opacity = 1;
    cursor = true;
  }
}, speed);

const portfolioButton = document.querySelector("#click");
portfolioButton.addEventListener("click", () => smoothScroll("header"));
