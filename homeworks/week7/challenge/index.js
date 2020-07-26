const fwBtn = document.querySelector('.controls__fwBtn');
const bwBtn = document.querySelector('.controls__bwBtn');
const sliders = document.querySelector('.sliders').children;
let currentSliderIndex = 0;
sliders[currentSliderIndex].classList.toggle('active');

fwBtn.addEventListener('click', () => {
  sliders[currentSliderIndex].classList.toggle('active');
  let nextSliderIndex = currentSliderIndex + 1;
  console.log(sliders);
  if (!sliders[nextSliderIndex]) {
    nextSliderIndex = 0;
  }
  sliders[nextSliderIndex].classList.toggle('active');
  currentSliderIndex = nextSliderIndex;
});

bwBtn.addEventListener('click', () => {
  sliders[currentSliderIndex].classList.toggle('active');
  let previousSliderIndex = currentSliderIndex - 1;
  if (!sliders[previousSliderIndex]) {
    previousSliderIndex = sliders.length - 1;
  }
  sliders[previousSliderIndex].classList.toggle('active');
  currentSliderIndex = previousSliderIndex;
});
