/* eslint no-continue: 0 */
const form = document.getElementsByTagName('form');

form[0].addEventListener('submit', (e) => {
  let submitContent = '請確認您所提交的內容';
  console.log(e);
  const submits = e.target;
  for (let i = 0; i < submits.length - 1; i += 1) {
    let h2Content = submits[i].closest('div').children[0].outerHTML;
    h2Content = `${h2Content.slice(h2Content.indexOf('>') + 1, h2Content.indexOf('<', 2))}：`;
    const submitText = submits[i].value;
    if (submits[i].type === 'radio') {
      if (!submits[i].checked) {
        continue;
      }
    }
    submitContent += `\n${h2Content}${submitText}`;
  }
  alert(submitContent);
});

form[0].addEventListener('invalid', (e) => {
  const questionDiv = e.target.closest('div');
  const invalidMessage = e.target.validationMessage;
  const warningLine = document.createElement('div');
  warningLine.classList.add('warningLine');
  warningLine.innerText = invalidMessage;
  const { children } = questionDiv;
  const lastLine = children[children.length - 1];
  if (lastLine.tagName !== 'DIV') {
    questionDiv.appendChild(warningLine);
  }
}, true);

form[0].addEventListener('change', (e) => {
  const questionDiv = e.target.closest('div');
  const invalidMessage = e.target.validationMessage;
  const warningLine = document.createElement('div');
  warningLine.classList.add('warningLine');
  warningLine.innerText = invalidMessage;
  const { children } = questionDiv;
  const lastLine = children[children.length - 1];
  if (invalidMessage) {
    if (lastLine.tagName !== 'DIV') {
      questionDiv.appendChild(warningLine);
    }
  } else if (lastLine.tagName === 'DIV') {
    questionDiv.removeChild(lastLine);
  }
});
