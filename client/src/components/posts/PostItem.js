import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {addLike,removeLike,deletePost} from '../../actions/post';

const PostItem = ({auth,post:{_id,text,image,name,avatar,user,likes,comments,date},addLike,removeLike,deletePost},profiles) => {
    return (
      <div className="post bg-white p-1 my-1">
      <div>
      <div>
        <a href="profile.html">
          <img
            className="adjust profile-img"
            src={avatar}
            alt=""
          />
          </a>
          </div>
          <div className="adjust post-title"><b>{name}</b></div>
         
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
        <button onClick={e=>addLike(_id)} type="button" class="btn btn-light">
          <i className="fas fa-thumbs-up"/>&nbsp;{likes.length>0 && (<span className='likes-count'>
          {likes.length}
          </span>)}
        </button>
        <button onClick={e=>removeLike(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length>0 && (<span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user===auth.user._id && (
            <button onClick={e=>deletePost(_id)} type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
            </button>
        )}
        
      </div>
    </div>
    );
}

PostItem.propTypes = {
  post:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  addLike:PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem);
