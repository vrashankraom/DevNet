import React, {Fragment, useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import {getProfiles} from '../../actions/profile'
import Alert from '../layout/Alert';

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
const [developers,setDevelopers] =useState("");
useEffect(()=>{
    getProfiles();
},[getProfiles,loading]);
    

    const inputEvent = (e) => {
        e.preventDefault();
        setDevelopers(e.target.value)
        console.log(e.target.value);
      };
    return (
        <Fragment>
            <section className="container">
            <Alert/>
                {loading? (<Spinner/>) : (<Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>Browse and connect with Developers
                    </p>
                    <div className="form form-group">
                    <div className="form-group">
                   <input type="text" placeholder="Type a Developer name..." name="developers" value={developers} onChange={inputEvent}/>
                   <small className="form-text">
                   Search for Developers
                   </small>
                   </div>
                   </div>
                    {!developers && <div className="profiles">
                        {profiles.length>0 ? (profiles.map(profile =>(
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))): <Spinner/>}
                    </div>}
                    {developers && <div className="profiles">
                        {profiles.map(profile=> (
                        profile.user.name.toLowerCase().includes(developers.toLowerCase()) && <ProfileItem key={profile._id} profile={profile}/>
                       ))}
                    </div>}
                </Fragment>)}
            </section>
        </Fragment>
    )
}

Profiles.propTypes = {
  getProfiles:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles);
