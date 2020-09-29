const main = document.querySelector('.main');
main.addEventListener('click', (e) => {
  if (e.target.classList.contains('main__card__readmoreBtn')) {
    e.target.previousElementSibling.classList.toggle('expand');
    if (e.target.innerText === 'READ MORE') {
      e.target.innerText = 'READ LESS';
    } else {
      e.target.innerText = 'READ MORE';
    }
  }
});
