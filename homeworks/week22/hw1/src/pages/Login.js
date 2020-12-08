import { useEffect, useContext } from 'react';
import { login, getUserData } from '../WebAPI';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useInput from '../useInput';
import Input from '../components/Input';
import { UserContext } from '../context';

const StyledForm = styled.form`
  margin: 0 auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Login() {
  
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
          value: '登入'
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const filters = ['username', 'password'];
    const loginInformation = {};
    inputs.forEach(input => {
      for (const filter of filters) {
        if (filter === input.attributes.name) {
          loginInformation[filter] = input.attributes.value
        }
      }
    })
    try {
      const response = await login(loginInformation);
      const { ok, message, token } = response;
      if (ok !== 1) {
        setErrorMessage(message);
        return;
      }
      window.localStorage.removeItem('token');
      window.localStorage.setItem('token', token);
      getUserData({ token })
        .then(data => {
          setUser(data);
        });
      history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <StyledForm onSubmit={handleLogin}>
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