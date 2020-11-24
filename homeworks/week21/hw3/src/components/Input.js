import { useContext } from 'react';
import { HandlersContext } from './Form';
import { StyledSpan, StyledInput, SpanErrorMessage} from './StyledComponents'

export default function Input({ input }) {

  const { attributes } = input;
  const handlers = useContext(HandlersContext);
  const { handleChange, handleValidationCheck } = handlers;
  
  function InputTitle({ title, required }) {
    return (
      <h2>
        {title}
        {required ? <StyledSpan>*</StyledSpan> : ''}
      </h2>
    )
  }
  
  return (
    <div>
      <label htmlFor={attributes.name}>
        <InputTitle title={input.text} required={input.attributes.required}/>
        {input.description ? <p>{input.description}</p> : ''}
      </label>
      {input.attributes.type === 'radio'
        ? input.options.map(option => {
          return (
            <div key={option.key}>
              <label htmlFor={option.id}>
                <input
                  {...attributes}
                  {...option}
                  onInvalid={handleValidationCheck}
                  onChange={handleChange}
                  onBlur={handleValidationCheck}
                />
                  {option.value}
              </label>
            </div>
          )
        })
        : <StyledInput
            {...attributes}
            onInvalid={handleValidationCheck}
            onBlur={handleValidationCheck}
            onChange={handleChange}
          />
      }
      <div>{input.warningMessage ? <SpanErrorMessage>{input.warningMessage}</SpanErrorMessage> : ''}</div>
      <div><SpanErrorMessage>{input.errorMessage}</SpanErrorMessage></div>
    </div>
  )
}
