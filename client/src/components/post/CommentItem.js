import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {deleteComment} from '../../actions/post'

const commentItem = ({postId,
    comment:{ _id, text, status,company,image,name, avatar, user, date },
    deleteComment,
    auth}) => {
    return (
        <div class="post bg-white p-1 my-1">
         <div>
         <div>
        <Link to={`/profile/user/${user}`}>
          <img
            className="adjust profile-img"
            src={avatar}
            alt=""
          />
          </Link>
          </div>
          
          <div className="adjust post-title">
          <Link to={`/profile/user/${user}`}><b>{name}</b>
          </Link>
          <div className="post-status">{status}{company && <span> at {company}</span>}</div>
          </div>
          <div className="adjust comment-button">
              {!auth.loading && user===auth.user._id && (
                <button onClick={()=>deleteComment(postId, _id)} type="button" className="btn btn-danger">
                  <i className="fas fa-times"/>
                </button>
            )}</div>
         
          {image&&<img
            className="post-img my-1"
            src={image}
            alt=""
          />}
      </div>
      <div>
        <p className="posttext">
          {text}
        </p>
         <p className="post-date">
            Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        </div>
    </div>
    )
}

commentItem.propTypes = {
  postId:PropTypes.number.isRequired,
  comment:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
});

export default connect(mapStateToProps,{deleteComment})(commentItem);
