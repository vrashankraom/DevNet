import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';



const PrivateRoute = props => {
    if (!props.auth.isAuthenticated && !props.auth.loading) {
        return <Redirect to='/login' />;
    } else {
        return <Route exact path={props.path} component={props.component} />
    }
}

PrivateRoute.propTypes = {
  auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
