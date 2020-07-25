const answers = document.querySelectorAll('.FAQ__content--answer');
const QuestionDiv = document.querySelectorAll('.FAQ__content--question');

for (let i = 0; i < answers.length; i += 1) {
  answers[i].style.display = 'none';
}

for (let i = 0; i < QuestionDiv.length; i += 1) {
  QuestionDiv[i].addEventListener('click', (e) => {
    let answer;
    if (e.target.tagName === 'DIV') {
      answer = e.target.nextElementSibling;
    } else if (e.target.tagName === 'SPAN') {
      answer = e.target.parentElement.nextElementSibling;
    }
    if (answer.style.display === 'none') {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
    console.log(e.target);
  });
}
