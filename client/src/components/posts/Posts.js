import React,{Fragment,useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import {getProfiles} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import Alert from '../layout/Alert';
import PostForm from './PostForm';

const Posts = ({getProfiles,getPosts,profiles,post:{posts,loading}}) => {
    const [postsInfo,setPostsInfo] =useState("");

    useEffect(() => {
       getPosts();
    }, [getPosts,loading]);

    useEffect(() => {
        getProfiles();
     }, [getProfiles,loading]);

     const inputEvent = (e) => {
        e.preventDefault();
        setPostsInfo(e.target.value)
        console.log(e.target.value);
      };
    return (
        loading ? (<Spinner/>):(<Fragment>
            <section className="container">
            <Alert/>
             <h1 className="large text-primary">Posts</h1>
             <p className="lead">
                 <i className="fas fa-user"/> Welcome to the Community!
             </p>
             {<PostForm/>}
             <div className="posts-search">
             <div className="form form-group">
             <h1 className="lead">
                 <i className="fas fa-comment-dots"/> Posts
             </h1>
                    <div className="form-group">
                   <input type="text" placeholder="Filter the posts..." 
                       name="postInfo" value={postsInfo} onChange={inputEvent}
                   />
                   <small className="form-text">
                   Search for Posts
                   </small>
                   </div>
                   </div>
                   </div>
                   {!postsInfo &&<div className="posts">{posts.map((post) => (
                   <PostItem key={post._id} post={post} profiles={profiles}/>
                    ))}</div>}
                    {postsInfo &&<div className="posts">{posts.map((post) => (
                    post.text.toLowerCase().includes(postsInfo.toLowerCase()) && <PostItem key={post._id} post={post} profiles={profiles}/>
                    ))}</div>}
         
            </section>
        </Fragment>)
    )
}

Posts.propTypes = {
  getPosts:PropTypes.func.isRequired,
  getProfiles:PropTypes.func.isRequired,
  post:PropTypes.object.isRequired,
  profiles:PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
    post:state.post,
    profiles:state.profiles
})

export default connect(mapStateToProps,{getProfiles,getPosts})(Posts);
