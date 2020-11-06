const ApiEndpoint = 'http://lottery.waynechen.ddnsfree.com/lottery';
const $prizeCard = $('.prize__card');
const $prizeLoader = $('.prize__loader');

function init() {
  let isDrawn = false;
  let prize = {};
  return {
    isDrawn: () => isDrawn,
    prize: () => prize,

    draw: async () => {
      if (isDrawn) return 'already drawn';
      isDrawn = true;
      prize = await $.get(ApiEndpoint);
    },
  };
}
const lottery = init();

$(document).on('click', '.lottery__btn', async (e) => {
  if (lottery.isDrawn()) return;
  $('.lottery__btn').hide();
  $prizeCard.text('');
  $prizeLoader.toggleClass('invisible');
  await lottery.draw();
  const { prize, description, image } = lottery.prize();
  if (!prize) return alert('系統錯誤，請重新整理後再試。');
  const cardTemplate = `
  <div class="card-body">
    <h5 class="card-title prize__card__title text-center">${prize}</h5>
    <p class="text-center card-text prize__card__description">${description}</p>
  </div>
  <img src="${image}" class="card-img-bottom  prize__card__image img-fluid" alt="...">
  `;
  const $card = $(cardTemplate);
  $prizeCard.removeClass('invisible');
  await $prizeCard.append($card);
  $prizeLoader.toggleClass('invisible');
});
