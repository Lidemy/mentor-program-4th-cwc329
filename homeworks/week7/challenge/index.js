const fwBtn = document.querySelector('.controls__fwBtn');
const bwBtn = document.querySelector('.controls__bwBtn');
const sliders = document.querySelector('.sliders').children;
let currentSliderIndex = 0;
sliders[currentSliderIndex].style.zIndex = 1;

fwBtn.addEventListener('click', () => {
  sliders[currentSliderIndex].style.zIndex = 0;
  currentSliderIndex += 1;
  if (!sliders[currentSliderIndex]) {
    currentSliderIndex = 0;
  }
  sliders[currentSliderIndex].style.zIndex = 1;
});

bwBtn.addEventListener('click', () => {
  sliders[currentSliderIndex].style.zIndex = 0;
  currentSliderIndex -= 1;
  if (!sliders[currentSliderIndex]) {
    currentSliderIndex = sliders.length - 1;
  }
  sliders[currentSliderIndex].style.zIndex = 1;
});
