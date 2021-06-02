import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../actions/post'

const CommentForm = ({postId,addComment}) => {
    const [text,setText] = useState("");
    const [image,setImage] = useState(null);
    return (
        <div class="comment-form">
        <div class="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form className="form my-1"
        onSubmit={e=>{
            e.preventDefault();
            addComment(postId,text,image);
            setImage(null);
            setText("");
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Add a Comment..."
          ></textarea>
          <div><input type="file" accept="image" placeholder="choose a file" name="url" onChange={e=>setImage(e.target.files[0])}/></div>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
  addComment:PropTypes.func.isRequired
}

export default connect(null,{addComment})(CommentForm);
