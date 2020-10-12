/*
const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");

const section = document.querySelector("section");
const end = document.querySelector(".one");

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  duration: 6000,
  triggerElement: intro,
  triggerHook: 0,
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 2000,
  triggerElement: intro,
  triggerHook: 0,
})
  .addIndicators({
    name: "text",
    colorTrigger: "green",
    indent: 200,
  })
  .setTween(textAnim)
  .addTo(controller);

let accelamount = 0.2;
let scrollpos = 0;
let delay = 0;

scene.on("update", (e) => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  video.currentTime = scrollpos;
}, 120);
*/

$("document").ready(function () {
  var controller = new ScrollMagic.Controller();

  $(".sample").each(function () {
    console.log(this.children[1].children[0]);

    var Scene = new ScrollMagic.Scene({
      triggerElement: this.children[0],
      duration: 400,
      triggerHook: 0,
    })
      .setClassToggle(this, "fade-in")
      .setPin(this.children[1].children[0])
      // .addIndicators()
      .addTo(controller);
  });

  const html = document.documentElement;
  const canvas = document.getElementById("hero-lightpass");
  const context = canvas.getContext("2d");

  const frameCount = 480;
  const currentFrame = (index) =>
    `jpg/${index
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
