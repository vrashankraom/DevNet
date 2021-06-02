import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import {getProfiles} from '../../actions/profile'
import Alert from '../layout/Alert';

const Profiles = ({getProfiles,profile:{profiles,repos,loading}}) => {
useEffect(()=>{
    getProfiles();
},[getProfiles,loading]);
    return (
        <Fragment>
            <section className="container">
            <Alert/>
                {loading? (<Spinner/>) : (<Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>Browse and connect with Developers
                    </p>
                    <div className="profiles">
                        {profiles.length>0 ? (profiles.map(profile =>(
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))): <Spinner/>}
                    </div>
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
