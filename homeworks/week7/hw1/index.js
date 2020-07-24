/* eslint no-continue: 0 */
const form = document.getElementsByTagName('form');

form[0].addEventListener('submit', (e) => {
  e.preventDefault();
  let submitContent = '請確認您所提交的內容';
  const submits = e.target;
  for (let i = 0; i < submits.length - 1; i += 1) {
    let h2Content = '';
    let submitText = '';
    if (submits[i].type === 'radio') {
      if (submits[i].checked) {
        h2Content = '報名類型：';
        submitText = submits[i].parentElement.textContent;
        submitText = submitText.slice(1);
      } else {
        continue;
      }
    } else {
      h2Content = submits[i].previousElementSibling.textContent;
      h2Content = `${h2Content.slice(0, h2Content.length - 2)}：`;
      submitText = submits[i].value;
    }
    submitContent += `\n${h2Content}${submitText}`;
  }
  console.log(submitContent);
  alert(submitContent);
});

form[0].addEventListener('invalid', (e) => {
  if (e.target.id === 'on-ground') {
    return;
  }
  let questionDiv = e.target.parentElement;
  if (questionDiv.tagName === 'SECTION') {
    questionDiv = questionDiv.parentElement;
  }
  const invalidMessage = e.target.validationMessage;
  const warningLine = document.createElement('div');
  const { children } = questionDiv;
  const lastLine = children[children.length - 1];
  if (lastLine.tagName !== 'DIV') {
    warningLine.innerText = invalidMessage;
    warningLine.style.color = '#e74149';
    questionDiv.appendChild(warningLine);
  }
}, true);

form[0].addEventListener('change', (e) => {
  let questionDiv = e.target.parentElement;
  if (questionDiv.tagName === 'SECTION') {
    questionDiv = questionDiv.parentElement;
  }
  const invalidMessage = e.target.validationMessage;
  const { children } = questionDiv;
  const lastLine = children[children.length - 1];
  const warningLine = document.createElement('div');
  if (invalidMessage) {
    if (lastLine.tagName !== 'DIV') {
      warningLine.innerText = invalidMessage;
      warningLine.style.color = '#e74149';
      questionDiv.appendChild(warningLine);
    }
  } else if (lastLine.tagName === 'DIV') {
    questionDiv.removeChild(lastLine);
  }
});
