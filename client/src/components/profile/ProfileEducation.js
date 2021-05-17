import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education:{school,degree,fieldofstudy,current,to,from,description}}) => {
    return (
        <Fragment>
        <div>
            <h3 className="text-dark"><i className="fas fa-book-open"/> {school}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p>
                <strong>Degree: </strong>{degree}
            </p>
            <p>
                <strong>FieldofStudy: </strong>{fieldofstudy}
            </p>

           {description && (<p><strong>Description: </strong> {description}</p>)}
        </div>
        </Fragment>
    )
}

ProfileEducation.propTypes = {

}

export default ProfileEducation
