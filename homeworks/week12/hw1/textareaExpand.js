function dealHeight(e) {
  const event = e.target;
  setTimeout(() => {
    event.style.height = `${event.scrollHeight}px`;
  }, 0);
}

document.querySelector('.board__addComment__form__comment').addEventListener('keydown', (e) => {
  dealHeight(e);
});

document.querySelector('.board__addComment__form__comment').addEventListener('focus', (e) => {
  dealHeight(e);
}, true);

document.querySelector('.board__editNicknameBtn').addEventListener(
  'click',
  () => {
    document.querySelector('.board__editNickname').classList.toggle('hide');
  },
);
