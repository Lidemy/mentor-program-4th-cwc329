import styled from 'styled-components';

const FormStyle = styled.form`
  margin: 10px auto;
`;

export default function Form({ handlers, inputsContent }) {
  return (
    <FormStyle onSubmit={handlers.addTodo}>
      <input type="text" name="todo" onChange={handlers.inputChange} value={inputsContent} />
      <button>Add</button>
    </FormStyle>
  );
}
