const QuestionDiv = document.querySelectorAll('.FAQ__content--question');

for (let i = 0; i < QuestionDiv.length; i += 1) {
  QuestionDiv[i].addEventListener('click', (e) => {
    const answer = e.target.closest('div').nextElementSibling;
    answer.classList.toggle('active');
  });
}
