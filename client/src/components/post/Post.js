import React,{Fragment, useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import {getPost} from '../../actions/post'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import Alert from '../layout/Alert';

const Post = ({getPost,post:{post,loading},match}) => {
const [commentInfo,setCommentInfo] =useState("");

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost,match.params.id,loading])

    const inputEvent = (e) => {
        e.preventDefault();
        setCommentInfo(e.target.value)
        console.log(e.target.value);
      };
        return loading || post===null?<Spinner/>:<Fragment>
        <section className="container">
        <Alert/>
        <Link to="/posts" className="btn">
        Back To Posts
      </Link>
          <PostItem post={post} showActions={false}/>
          <CommentForm postId={post._id} />
          <div className="comments-search">
          <div className="form form-group">
             <h1 className="lead">
                 <i className="fas fa-comment-dots"/> Comments
             </h1>
                    <div className="form-group">
                   <input type="text" placeholder="Filter the comments..." 
                       name="commentInfo" value={commentInfo} onChange={inputEvent}
                   />
                   <small className="form-text">
                   Search for Comments
                   </small>
                   </div>
                   </div>
                   </div>
                   {!commentInfo && <div className="comments">
              {post.comments.map(comment=>(<CommentItem key={comment._id} comment={comment}
              postId={post._id}/>))}
              </div>}

              {commentInfo && <div className="comments">
              {post.comments.map(comment=>(comment.text.toLowerCase().includes(commentInfo.toLowerCase()) && <CommentItem key={comment._id} comment={comment}
              postId={post._id}/>))}
             </div>}
        </section>
        </Fragment>
};

Post.propTypes = {
 getPost:PropTypes.func.isRequired,
 post:PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post);
