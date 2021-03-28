import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {AuthProvider} from './context/AuthContext';

import {PrivateRoute} from './components/PrivateRoute';

//We imports the routes that we are going use
import {Login} from './Routes/Login';
import {SignUp} from './Routes/SignUp';


const Index = () => {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route path='/signUp' component={SignUp}/>

          <PrivateRoute path='/'>
            <App/>
          </PrivateRoute>
          
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
