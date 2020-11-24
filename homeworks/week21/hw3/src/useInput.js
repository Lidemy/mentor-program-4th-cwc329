import { useState } from 'react';

export default function useInput() {

  const formInputs = [
    {
      attributes: {
        type: 'text',
        name: 'nickname',
        id: 'nickname',
        placeholder: '您的回答',
        required: true,
        value: '',
      },
      text: '暱稱',
      errorMessage: '',
    },
    {
      attributes: {
        type: 'email',
        name: 'email',
        id: 'email',
        placeholder: '您的電子郵件',
        required: true,
        value: ''
    },
      text: '電子郵件',
      errorMessage: '',
    },
    {
      attributes: {
        type: 'tel',
        name: 'cellphone',
        id: 'cellphone',
        placeholder: '您的手機號碼',
        pattern: '^09[0-9]{8}',
        required: true,
        value: ''
    },
      text: '手機號碼',
      errorMessage: '',
    },
    {
      attributes: {
        type: 'radio',
        name: 'program',
        required: true,
        value: ''
      },
      options:[
        {id: 'in-bed', value: '躺在床上用想像力實作', key: 'inBed'},
        {id: 'on-ground', value: '趴在地上滑手機找現成的', key: 'onGround'}
      ],
      text: '報名類型',
      errorMessage: '',
    },
    {
      attributes: {
        type: 'text',
        name: 'acquire',
        id: 'acquire',
        placeholder: '您的回答',
        required: true,
        value: ''
    },
      text: '怎麼知道這個活動的',
      errorMessage: '',
    },
    {
      attributes: {
        type: 'text',
        name: 'other',
        id: 'other',
        placeholder: '您的回答',
        required: false,
        value: ''
    },
      text: '其他',
      errorMessage: '',
      description: '對活動的一些建議'
    },
    {
      attributes: {
        type: 'submit',
        name: 'submit',
        value: '提交'
      },
      errorMessage: '',
      warningMessage: '請勿透過表單送出您的密碼'
    }
  ]
  const [inputs, setInputs] = useState(formInputs);

  function handleValidationCheck(e) {
    const invalidMessage = e.target.validationMessage;
    setInputs(inputs.map(input => {
      const statesName = input.attributes.name;
      const htmlTagName = e.target.attributes['name'].value;
      return statesName !== htmlTagName
        ? input
        : {...input, errorMessage: invalidMessage}
    }))
  }

  function handleChange(e) {
    const htmlTagName = e.target.attributes['name'].value;
      setInputs(inputs.map(input => {
        const statesName = input.attributes.name;
        return (statesName !== htmlTagName)
          ? input
          : {...input, attributes: {...input.attributes, value: e.target.value}}
      }))
  }

  const handlers = {
    handleChange,
    handleValidationCheck
  }

  return {
    inputs,
    handlers
  }
}