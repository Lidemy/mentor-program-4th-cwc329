import { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components'
import './App.css';
import Navbar from './components/Navbar'
import Posts from './pages/Posts';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import { getUserData } from './WebAPI';
import { UserContext } from './context';

const AppWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;


`

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    getUserData({ token })
      .then(data => {
        if (data.ok !== 1) {
          window.localStorage.setItem('token', '');
          setUser(null);
        } else {
          if (user && data.data.id === user.data.id) {
            return;
          }
          setUser(data);
        }
      })
  }, [user])

  return (
    <AppWrapper>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/addPost">
              <AddPost />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </AppWrapper>
  );
}

export default App;
