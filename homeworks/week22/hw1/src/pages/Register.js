import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getUserData, register } from '../WebAPI';
import { UserContext } from '../context';
import useInput from '../useInput';
import Input from '../components/Input';

const StyledForm = styled.form`
  margin: 0 auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Register() {
  
  const {
    errorMessage,
    setErrorMessage,
    inputs,
    setInputs,
    handleChange,
    handleValidationCheck
  } = useInput();
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const formInputs = [
      {
        attributes: {
          type: 'text',
          name: 'username',
          value: '',
          required: true
        },
        title: '帳號'
      },
      {
        attributes: {
          type: 'text',
          name: 'nickname',
          value: '',
          required: true
        },
        title: '暱稱'
      },
      {
        attributes:
        {
          type: 'password',
          name: 'password',
          value: '',
          required: true
        },
        title: '密碼'
      },
      {
        attributes:
        {
          type: 'submit',
          name: 'submit',
          value: '註冊'
        },
        title: ''
      },
    ]
    setInputs(formInputs);
  }, [setInputs]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const filters = ['username', 'password', 'nickname'];
    const registerInformation = {};
    inputs.forEach(input => {
      for (const filter of filters) {
        if (filter === input.attributes.name) {
          registerInformation[filter] = input.attributes.value
        }
      }
    })
    try {
      const response = await register(registerInformation);
      const { ok, token } = response;
      if (ok !== 1) {
        setErrorMessage(response.message);
        return;
      }
      window.localStorage.setItem('token', response.token);
      getUserData({ token })
        .then(data => {
          setUser(data);
        })
      history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <StyledForm onSubmit={handleRegister}>
        {inputs.map(input => {
          return (
            <Input key={input.attributes.name} input={input} handleChange={handleChange} handleValidationCheck={handleValidationCheck} />
          )
        })}
      </StyledForm>
      <div><p>{errorMessage}</p></div>
    </div>
  )
}