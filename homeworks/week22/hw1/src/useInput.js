import { useState, useCallback } from 'react';

export default function useInput() {
  const [inputs, setInputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidationCheck = useCallback((name, invalidMessage) => {
    setInputs(inputs.map(input => {
      const statesName = input.attributes.name;
      return statesName !== name
        ? input
        : {...input, errorMessage: invalidMessage}
    }))
  }, [setInputs, inputs])

  const handleChange = useCallback((name, newValue) => {
    setInputs(inputs.map(input => {
      return (name !== input.attributes.name)
        ? input
        : {...input, attributes: {...input.attributes, value: newValue}}
    }))
  }, [setInputs, inputs])

  return {
    errorMessage,
    setErrorMessage,
    inputs,
    setInputs,
    handleChange,
    handleValidationCheck
  }
}