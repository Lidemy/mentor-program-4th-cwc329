/* eslint no-undef: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-restricted-globals: 0 */
const apiUrl = 'http://mentor-program.co/mtr04group6/cwc329/todoList/API/todos.php';
const $unfinished = $('.todos__unfinished');
const $finished = $('.todos__finished');
let isEditing = false;
let todoId = null;
const pageName = 'index.html';

const pageUrl = $(location).attr('href');
const index = pageUrl.lastIndexOf(pageName) + pageName.length;
const queryString = pageUrl.slice(index + 1);
const temp = queryString.split('&');
const params = {};
temp.forEach((e) => {
  const arr = e.split('=');
  [key, value, ...rest] = arr;
  params[key] = value;
});

todoId = Number(params.id);

const unfinishedTemplate = `
<li class="list-group-item">
  <div class="row">
    <div class="col-8 mr-auto todoContent">
      %todo
    </div>
    <div class="col-auto">
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary doneBtn">DONE</button>
        <button type="button" class="btn btn-info editBtn">EDIT</button>
        <button type="button" class="btn btn-secondary deleteBtn">DELETE</button>
      </div>
    </div>
  </div>
</li>
`;

const finishedTemplate = `
<li class="list-group-item">
  <div class="row">
    <div class="col-8 mr-auto todoContent">
      %todo
    </div>
    <div class="col-auto">
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary undoneBtn">UNDONE</button>
        <button type="button" class="btn btn-secondary deleteBtn">DELETE</button>
      </div>
    </div>
  </div>
</li>
`;

const editFormTemplate = `<form class="editForm">
<div class="row">
  <div class="col-8 mr-auto">
    <textarea rows="2" class="form-control">%todo</textarea>
  </div>
  <div class="col-auto">
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary changeBtn">CHANGE</button>
      <button type="button" class="btn btn-secondary cancelBtn">CANCEL</button>
    </div>
  </div>
</div>
</form>`;

function escapeHtml(unsafe) {
  return !unsafe ? unsafe : unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

$('.filters').on('click', '.btn', (e) => {
  if ($(e.target).hasClass('allBtn')) {
    $('.todos__unfinished').show();
    $('.todos__finished').show();
  } else if ($(e.target).hasClass('unfinishedBtn')) {
    $('.todos__unfinished').show();
    $('.todos__finished').hide();
  } else if ($(e.target).hasClass('finishedBtn')) {
    $('.todos__unfinished').hide();
    $('.todos__finished').show();
  }
});

function showTodo(data) {
  todoList = JSON.parse(data[0].todo);
  ({ finished, unfinished } = todoList);
  unfinished.forEach((e) => {
    const $card = $(unfinishedTemplate.replace('%todo', escapeHtml(e)));
    $('.todos__unfinished .list-group').append($card);
  });
  finished.forEach((e) => {
    const $card = $(finishedTemplate.replace('%todo', escapeHtml(e)));
    $('.todos__finished .list-group').append($card);
  });
}

function getTodo(id, cb) {
  const queryStr = `?id=${id}`;
  $.ajax(apiUrl + queryStr)
    .done((data) => {
      if (data.err) {
        alert(data.message);
      } else {
        cb(data);
      }
    });
}

if (todoId) {
  getTodo(todoId, showTodo);
} else {
  todoId = null;
}

$('.addTodoForm').submit((e) => {
  e.preventDefault();
  const newTodo = $('.addTodoForm__todo').val();
  const $newCard = $(unfinishedTemplate.replace('%todo', escapeHtml(newTodo)));
  $('.todos__unfinished .list-group').append($newCard);
  $('.addTodoForm__todo').val('');
  $newCard.fadeIn();
});

$unfinished.on('click', '.doneBtn', (e) => {
  const selectedCard = $(e.target.closest('li'));
  const doneCard = $(finishedTemplate.replace('%todo', escapeHtml(selectedCard.find('.todoContent').text())));
  selectedCard.remove();
  doneCard.appendTo($('.todos__finished .list-group')).fadeIn(1000);
});

$finished.on('click', '.undoneBtn', (e) => {
  const selectedCard = $(e.target.closest('li'));
  const undoneCard = $(unfinishedTemplate.replace('%todo', escapeHtml(selectedCard.find('.todoContent').text())));
  selectedCard.remove();
  undoneCard.appendTo($('.todos__unfinished .list-group')).fadeIn(1000);
});

$('.todos').on('click', '.deleteBtn', (e) => {
  const selectedCard = $(e.target.closest('li'));
  selectedCard.remove();
});

$('.todos').on('click', '.editBtn', (e) => {
  if (isEditing) {
    alert('please finish your current editing');
  } else {
    isEditing = true;
    const selectedCard = $(e.target.closest('li'));
    const oldTodo = selectedCard.find('.todoContent').text().trim();
    selectedCard.children('.row').hide();
    selectedCard.append($(editFormTemplate.replace('%todo', oldTodo)));
  }
});

$('.todos').on('click', '.cancelBtn', (e) => {
  isEditing = false;
  const selectedForm = $(e.target.closest('form'));
  const selectedCard = $(e.target.closest('li'));
  selectedForm.remove();
  selectedCard.children('.row').show();
});

$('.todos').on('click', '.changeBtn', (e) => {
  isEditing = false;
  const selectedForm = $(e.target.closest('form'));
  const selectedCard = $(e.target.closest('li'));
  const newTodo = selectedForm.find('textarea').val().trim();
  selectedForm.remove();
  selectedCard.find('.todoContent').text(newTodo);
  selectedCard.children('.row').show();
});

$('.todos').on('click', '.clearAllBtn', () => {
  $('.todos__finished .list-group').empty();
});

$('.saveBtn').click(() => {
  if (isEditing) {
    alert('please finish your current editing');
  } else {
    const todos = $unfinished.find('ul').children();
    const dones = $finished.find('ul').children();
    const finished = [];
    const unfinished = [];
    for (const todo of todos) {
      unfinished.push($(todo).find('.todoContent').text().trim());
    }
    for (const done of dones) {
      finished.push($(done).find('.todoContent').text().trim());
    }
    const todoList = { finished, unfinished };
    $.ajax(
      {
        method: 'POST',
        url: apiUrl,
        data: {
          todo: JSON.stringify(todoList),
          id: todoId,
        },
      },
    ).done((data) => {
      let msg = 'Todo-list saved.';
      if (data[0].id) {
        todoId = data[0].id;
        msg += `
Your todo-list id is 
${todoId}.
You can send id via query string to restore your todo-list.`;
      }
      alert(msg);
    });
  }
});
