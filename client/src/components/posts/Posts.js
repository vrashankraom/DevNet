import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post'
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import Alert from '../layout/Alert';

const Posts = ({getPosts,post:{posts,loading}}) => {
    useEffect(() => {
       getPosts();
    }, [getPosts,loading]);
    return (
        loading ? (<Spinner/>):(<Fragment>
            <section className="container">
            <Alert/>
             <h1 className="large text-primary">Posts</h1>
             <p className="lead">
                 <i className="fas fa-user"/> Welcome to the Community!
             </p>
             {}
             <div className="posts">{posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}</div>
            </section>
        </Fragment>)
    )
}

Posts.propTypes = {
  getPosts:PropTypes.func.isRequired,
  post:PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Posts);
