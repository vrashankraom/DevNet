import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import {getProfiles} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import Alert from '../layout/Alert';
import PostForm from './PostForm';

const Posts = ({getProfiles,getPosts,profiles,post:{posts,loading}}) => {
    useEffect(() => {
       getPosts();
    }, [getPosts,loading]);

    useEffect(() => {
        getProfiles();
     }, [getProfiles,loading]);
    return (
        loading ? (<Spinner/>):(<Fragment>
            <section className="container">
            <Alert/>
             <h1 className="large text-primary">Posts</h1>
             <p className="lead">
                 <i className="fas fa-user"/> Welcome to the Community!
             </p>
             {<PostForm/>}
             <div className="posts">{posts.map((post) => (
          <PostItem key={post._id} post={post} profiles={profiles}/>
        ))}</div>
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
