import './App.css';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Form from './components/Form';
import { Todos, Button } from './components/Todos';

const AppWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
`;

const TodosWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [inputs, setInputs] = useState({ content: '', editingContent: '' });
  const [filter, setFilter] = useState('all');

  const id = useRef(1);

  const handlers = {
    addTodo: (e) => {
      e.preventDefault();
      if (!inputs.content) return;
      setTodos(
        [...todos, {
          id: id.current,
          content: inputs.content,
          isCompleted: false,
          isEditing: false,
        }],
      );
      setInputs(
        {
          content: '',
        },
      );
      id.current++;
    },

    inputChange: (e) => {
      setInputs(
        { ...inputs, content: e.target.value },
      );
    },

    changeStatus: (e) => {
      const selectId = Number(e.target.closest('.todo__card').attributes['data-id'].value);
      setTodos(
        todos.map((todo) => (todo.id !== selectId ? todo : {
          ...todo,
          isCompleted: !todo.isCompleted,
        })),
      );
    },

    deleteTodo: (e) => {
      const selectId = Number(e.target.closest('.todo__card').attributes['data-id'].value);
      setTodos(
        todos.filter((todo) => todo.id !== selectId),
      );
    },

    editBtnClick: (e) => {
      const selectId = Number(e.target.closest('.todo__card').attributes['data-id'].value);
      setTodos(
        todos.map((todo) => (todo.id !== selectId
          ? { ...todo, isEditing: false }
          : { ...todo, isEditing: true }
        )),
      );
      setInputs(
        { ...inputs, editingContent: e.target.value }
      )
    },

    editInputChange: e => {
      setInputs(
        { ...inputs, editingContent: e.target.value }
      )
    },

    changeTodo: e =>{
      if (!inputs.editingContent) return;
      const selectId = Number(e.target.closest('.todo__card').attributes['data-id'].value);
      setTodos(
        todos.map((todo) => (todo.id !== selectId ? todo : {
          ...todo,
          content: inputs.editingContent,
          isEditing: false
        })),
      );
      setInputs(
        {...inputs, editingContent: ''}
      )
    },

    cancelEditing: e => {
      const selectId = Number(e.target.closest('.todo__card').attributes['data-id'].value);
      setTodos(
        todos.map((todo) => (todo.id !== selectId ? todo : {
          ...todo,
          isEditing: false
        })),
      );
      setInputs(
        {...inputs, editingContent: ''}
      )
    },

    filtersChange: (e) => {
      const { value } = e.target.attributes['data-filter'];
      setFilter(
        value === 'all' ? 'all' : value === 'true',
      );
    },

    clearAll: () => {
      setTodos([]);
    },
  };

  useEffect(() => {
    console.log(inputs)
  }, [inputs]);

  return (
    <AppWrapper className="App">
      <Form handlers={handlers} inputsContent={inputs.content} />
      <div className="filters">
        <Button className="filters__allBtn" data-filter="all" onClick={handlers.filtersChange}>All</Button>
        <Button className="filters__completedBtn" data-filter onClick={handlers.filtersChange}>Completed</Button>
        <Button className="filters__uncompletedBtn" data-filter={false} onClick={handlers.filtersChange}>Uncompleted</Button>
      </div>
      <TodosWrapper className="todos">
        <div className="todos__header">
          <span className="todos__header__title">My Todos</span>
          <Button className="todos__header__clearAllBtn" onClick={handlers.clearAll}>Clear All Todos</Button>
        </div>
        {
          todos
            .filter((todo) => (filter === 'all'
              ? true
              : filter
                ? todo.isCompleted : !todo.isCompleted))
            .map((todo) => <Todos todo={todo} key={todo.id} handlers={handlers} />)
        }
      </TodosWrapper>
    </AppWrapper>
  );
}

export default App;
