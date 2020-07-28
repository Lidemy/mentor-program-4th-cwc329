const ApiEndpoint = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';

const request = new XMLHttpRequest();

const prizes = document.querySelectorAll('.lottery__prize');
let currentPrizeIndex = 0;

function changeImg(currentInd, newInd) {
  prizes[currentInd].classList.remove('show');
  prizes[currentInd].classList.add('hide');
  prizes[newInd].classList.add('show');
  prizes[newInd].classList.remove('hide');
  return newInd;
}

document.querySelector('.lottery').addEventListener('click', (e) => {
  if (e.target.classList.contains('pick')) {
    request.onload = () => {
      try {
        JSON.parse(request.response);
      } catch (err) {
        currentPrizeIndex = changeImg(currentPrizeIndex, 0);
        alert('系統不穩定，請再試一次');
        return;
      }
      let { prize } = JSON.parse(request.response);
      if (!prize) {
        currentPrizeIndex = changeImg(currentPrizeIndex, 0);
        alert('系統不穩定，請再試一次');
        return;
      }
      prize = prize.toLowerCase();
      console.log(prize);
      for (let i = 0; i < prizes.length; i += 1) {
        if (prizes[i].classList.contains(prize)) {
          currentPrizeIndex = changeImg(currentPrizeIndex, i);
          break;
        }
      }
    };
    request.open('GET', ApiEndpoint, true);
    request.send();
  }
  if (e.target.classList.contains('back')) {
    currentPrizeIndex = changeImg(currentPrizeIndex, 0);
  }
});
