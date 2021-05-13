import React,{Fragment,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute'
import ProfileForm from './components/profile-forms/ProfileForm';
import {Link, Redirect} from 'react-router-dom';
import { LOGOUT } from './actions/types';
import './App.css';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';



const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
    
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });

    
  }, []);
  
return(
<Provider store={store}>
<Router>
<Fragment>
  <Navbar/>
  <Switch>
  <Route exact path="/" component={Landing} />
  <Route exact path="/register" component={Register}/>
  <Route exact path="/login" component={Login}/>
  <PrivateRoute exact path="/dashboard" component={Dashboard}/>
  <PrivateRoute exact path="/edit-profile" component={ProfileForm}/>
  </Switch>
</Fragment>
</Router>
</Provider>
)}

export default App;
