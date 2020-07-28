const ApiEndpoint = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';

const request = new XMLHttpRequest();

const prizes = document.querySelectorAll('.lottery__prize');
let currentPrizeIndex = 0;
document.querySelector('.lottery').addEventListener('click', (e) => {
  if (e.target.classList.contains('lottery__btn')) {
    request.onload = () => {
      try {
        JSON.parse(request.response);
      } catch (err) {
        alert('系統不穩定，請再試一次');
        return;
      }
      let { prize } = JSON.parse(request.response);
      if (!prize) {
        alert('系統不穩定，請再試一次');
        return;
      }
      prizes[currentPrizeIndex].classList.remove('show');
      prizes[currentPrizeIndex].classList.add('hide');
      prize = prize.toLowerCase();
      for (let i = 0; i < prizes.length; i += 1) {
        if (prizes[i].classList.contains(prize)) {
          prizes[i].classList.add('show');
          prizes[i].classList.remove('hide');
          currentPrizeIndex = i;
          break;
        }
      }
    };
    request.open('GET', ApiEndpoint, true);
    request.send();
  }
});
