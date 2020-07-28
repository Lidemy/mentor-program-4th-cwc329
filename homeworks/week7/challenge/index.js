const fwBtn = document.querySelector('.controls__fwBtn');
const bwBtn = document.querySelector('.controls__bwBtn');
const sliders = document.querySelector('.sliders').children;
let currentSliderIndex = 0;

function changeImg(currentInd, direction) {
  let newInd;
  if (direction === 'forward') {
    newInd = currentInd + 1;
    if (!sliders[newInd]) {
      newInd = 0;
    }
    sliders[currentInd].classList.add('previous');
  } else {
    newInd = currentInd - 1;
    if (!sliders[newInd]) {
      newInd = sliders.length - 1;
    }
    sliders[currentInd].classList.add('next');
  }
  sliders[currentInd].classList.remove('show');
  sliders[newInd].classList.add('show');
  sliders[newInd].classList.remove('next');
  sliders[newInd].classList.remove('previous');
  return newInd;
}

fwBtn.addEventListener('click', () => {
  currentSliderIndex = changeImg(currentSliderIndex, 'forward');
});

bwBtn.addEventListener('click', () => {
  currentSliderIndex = changeImg(currentSliderIndex, 'left');
});
