import React,{Fragment, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile,deleteAccount} from '../../actions/profile'
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading},deleteAccount}) => {
  
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
            <DashboardActions/>
            {profile.experience.length? (<Experience experience={profile.experience}/>):('')}
            {profile.education.length? (<Education education={profile.education}/>):('')}

            <div className="my-2">
              <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                <i className="fas fa-user-minus"> Delete My Account</i>
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/edit-profile" className="btn btn-primary my-1">
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
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
  };
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });

export default  connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
