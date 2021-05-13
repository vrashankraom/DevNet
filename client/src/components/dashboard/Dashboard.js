import React,{Fragment, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import DashboardActions from './DashboardActions';
import store from '../../store';
import { LOGOUT } from '../../actions/types';

const Dashboard = ({getCurrentProfile,auth:{user,isAuthenticated},profile:{profile,loading}}) => {
  
  useEffect(() => {
    getCurrentProfile();
    },[loading])
    
    return (
      loading&&profile===null? <Spinner/> :<Fragment><section className="container">
       <Alert/>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}!
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
        </section>
      </Fragment>
    );
  };

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });

export default  connect(mapStateToProps, { getCurrentProfile })(Dashboard);
