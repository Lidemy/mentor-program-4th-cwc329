function dealHeight(e) {
  console.log(e);
  const event = e.target;
  setTimeout(() => {
    event.style.height = `${event.scrollHeight}px`;
  }, 0);
}

document.querySelector('.board__addComment__form__comment').addEventListener('keydown', (e) => {
  dealHeight(e);
});

document.querySelector('.board__editComment__form__comment').addEventListener('keydown', (e) => {
  console.log(e);
  dealHeight(e);
});

document.querySelector('.board__addComment__form__comment').addEventListener('focus', (e) => {
  dealHeight(e);
}, true);

document.querySelector('.board__editComment__form__comment').addEventListener('focus', (e) => {
  dealHeight(e);
}, true);
