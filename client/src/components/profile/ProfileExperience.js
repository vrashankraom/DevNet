import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experience:{company,title,location,current,to,from,description}}) => {
    return (
        <Fragment>
        <div>
            <h3 className="text-dark"><i className="fas fa-briefcase"></i> {company}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong>{title}
            </p>

           {description && (<p><strong>Description: </strong> {description}</p>)}
        </div>
        </Fragment>
    )
}

ProfileExperience.propTypes = {

}

export default ProfileExperience
