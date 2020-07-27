/* eslint no-restricted-syntax: 0 */
const addBtn = document.getElementsByName('addBtn')[0];

const toDoListTable = document.querySelector('.toDoList__table');

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

addBtn.addEventListener('click', () => {
  const addDate = document.getElementsByName('toDoDate')[0].value;
  const addTime = document.getElementsByName('toDoTime')[0].value;
  const addEvent = document.getElementsByName('toDoEvent')[0].value;
  if (addDate && addTime && addEvent) {
    const newTr = toDoListTable.insertRow(1);
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete';
    const newTrContent = {
      checkbox: newCheckbox.outerHTML,
      date: addDate,
      time: addTime,
      event: escapeHtml(addEvent),
      deletbtn: deleteBtn.outerHTML,
    };
    for (const s of Object.values(newTrContent)) {
      const newTd = newTr.insertCell();
      newTd.innerHTML = s;
    }
    const toDoRowsLength = toDoListTable.rows.length;
    if (toDoRowsLength > 2) {
      let switching = true;
      let shouldSwitch = false;
      while (switching) {
        let index;
        switching = false;
        const toDoRows = toDoListTable.rows;
        for (let i = 1; i < toDoRowsLength - 1; i += 1) {
          let x = toDoRows[i].getElementsByTagName('td')[1].innerText;
          let y = toDoRows[i + 1].getElementsByTagName('td')[1].innerText;
          if (x > y) {
            shouldSwitch = true;
            index = i;
            break;
          }
          if (x === y) {
            x = toDoRows[i].getElementsByTagName('td')[2].innerText;
            y = toDoRows[i + 1].getElementsByTagName('td')[2].innerText;
            if (x > y) {
              shouldSwitch = true;
              index = i;
              break;
            }
          }
        }
        if (shouldSwitch) {
          if (!index) return;
          toDoRows[index].parentNode.insertBefore(toDoRows[index + 1], toDoRows[index]);
          switching = true;
        }
      }
    }
    document.getElementsByName('toDoDate')[0].value = '';
    document.getElementsByName('toDoTime')[0].value = '';
    document.getElementsByName('toDoEvent')[0].value = '';
  } else {
    alert('請填寫所有欄位');
  }
});

toDoListTable.addEventListener('click', (e) => {
  const seletced = e.target.closest('tr');
  if (e.target.tagName === 'BUTTON') {
    seletced.parentElement.removeChild(seletced);
  }
  if (e.target.type === 'checkbox') {
    seletced.classList.toggle('del');
  }
});
