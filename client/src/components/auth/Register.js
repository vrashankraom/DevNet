import React,{useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
//Here we call setAlert module from actions to pass alert msg and alertType
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';
//Here we call Alert for displaying to user 
import Alert from '../layout/Alert';

const Register = ({register,setAlert,isAuthenticated}) => {

    const[formData,setFormData] = useState({
        name:'',
        email:'',
        username:'',
        password:'',
        password2:''
    });
    const {name,email,username,password,password2} =formData; 
    const onChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
          //Call setAlert
          setAlert('Passwords do not match', 'danger');
        } else {
          register({ name, email,username,password });
        }
      };
      if(isAuthenticated){
        return <Redirect to="/dashboard"/>
      }
    return (
        <div>
        <section className="container">
        <Alert/>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text"  name="name" placeholder='Name' value={name} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)} />
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Instagram username" name="username" value={username} onChange={e=>onChange(e)} required />
        </div>
        <small className="form-text"
            >This site uses GitHub profile image so if you want a profile image, enter GitHub username</small>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </section>
        </div>
    )
};
//To know the name of the prop type
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps,{ register,setAlert})(Register);