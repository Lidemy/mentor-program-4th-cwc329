import styled from 'styled-components';

const StyledInputSection = styled.div`
  width: 100%;
  & ~ & {
    margin-top: 10px;
  }
`

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 1.5rem;
`

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
`

export default function Input({ input, handleChange, handleValidationCheck }) {
  const { attributes } = input;
  
  const handleValueChange = (e) => {
    handleChange(input.attributes.name, e.target.value)
  }

  const handleValidation = (e) => {
    handleValidationCheck(input.attributes.name, e.target.validationMessage)
  }

  return (
    <StyledInputSection>
      <label htmlFor={attributes.name}>
        {input.title ? <h3>{input.title}</h3> : ''}
      </label>
      <div>
        {input.attributes.type !== 'textarea'
          ? <StyledInput
            {...attributes}
            onChange={handleValueChange}
            onBlur={handleValidation}
            onInvalid={handleValidation} />
          : <StyledTextarea
            {...attributes}
            onChange={handleValueChange}
            onBlur={handleValidation}
            onInvalid={handleValidation}>
            </StyledTextarea>
          }
      </div>
    </StyledInputSection>
  )
  
}