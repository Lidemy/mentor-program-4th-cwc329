const FAQ = document.querySelector('.FAQ');

FAQ.addEventListener('click', (e) => {
  const answer = e.target.closest('.FAQ__content--question').nextElementSibling;
  answer.classList.toggle('active');
});
