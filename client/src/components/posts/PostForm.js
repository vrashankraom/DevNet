import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {
    const [text,setText] = useState("");
    const [image,setImage] = useState(null);

    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1"
        onSubmit={e=>{
            e.preventDefault();
            addPost(text,image);
            setImage(null);
            setText("");
            
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Create a post"
          ></textarea>
          <div><input type="file" accept="image" placeholder="choose a file" name="url" onChange={e=>setImage(e.target.files[0])}/></div>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    );
};

PostForm.propTypes = {
addPost:PropTypes.func.isRequired
}

export default connect(null,{addPost})(PostForm);
