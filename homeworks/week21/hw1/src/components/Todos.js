import { useContext } from 'react';
import styled, { css } from 'styled-components';

const TodoCard = styled.div`
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .todo__card__content {
    text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
  }
`;

const Button = styled.button`
  margin: 5px 3px;
`;

function Todos({ StyleContext, todo, handlers }) {
  return (
    <TodoCard className="todo__card" data-id={todo.id} isCompleted={todo.isCompleted}>
      {todo.isEditing && <textarea onChange={handlers.editInputChange} defaultValue={todo.content}></textarea>}
      {todo.isEditing && <div className="todo__card__controls">
        <Button className="todo__card__controls__cancelBtn" onClick={handlers.cancelEditing}>Cancel</Button>
        <Button className="todo__card__controls__changeBtn" onClick={handlers.changeTodo}>Change</Button>
      </div>}
      {!todo.isEditing && <div className="todo__card__content">{todo.content}</div>}
      {!todo.isEditing
        && (<div className="todo__card__controls">
          <Button className="todo__card__controls__statusBtn" onClick={handlers.changeStatus}>
            {(!todo.isCompleted && 'Done') || (todo.isCompleted && 'Undone')}
          </Button>
          <Button className="todo__card__contorls__editBtn" onClick={handlers.editBtnClick}>
            Edit
          </Button>
          <Button className="todo__card__controls__deleteBtn" onClick={handlers.deleteTodo}>
            Delete
          </Button>
        </div>)}
    </TodoCard>
  );
}

export { Todos, Button };
