import React from 'react';
import ReactDOM from 'react-dom';
import {StyledFooter} from './components/StyledComponents';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
      <StyledFooter>
        <p>© 2020 © Copyright. All rights Reserved.</p>
      </StyledFooter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
