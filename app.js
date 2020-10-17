$("document").ready(function () {
  var controller = new ScrollMagic.Controller();

  $(".sample").each(function () {
     var Scene = new ScrollMagic.Scene({
       triggerElement: this.children[0],
       duration: 400,
      triggerHook: 0,
    }).setClassToggle(this, "fade-in")
      .setPin(this.children[1].children[0])
      // .addIndicators()
     .addTo(controller);
   });

  const html = document.documentElement;
  const canvas = document.getElementById("hero-lightpass");
  const context = canvas.getContext("2d");

  const frameCount = 480;
  const currentFrame = (index) =>
    `jpg2/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const img = new Image();
  img.src = currentFrame(1);
  // canvas.width = 1920;
  // canvas.height = 1080;
  img.onload = function () {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0);
  };

  const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  };

  window.addEventListener("scroll", () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1));
  });

  preloadImages();
});
