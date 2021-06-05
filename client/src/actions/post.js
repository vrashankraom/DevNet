import axios from 'axios';
import {setAlert} from './alert';
import {GET_POSTS,POST_ERROR, UPDATE_LIKES,ADD_POST,DELETE_POST,
    ADD_COMMENT,REMOVE_COMMENT,GET_POST} from './types';

//Get Posts
export const getPosts =()=>async dispatch =>{
    try{
        const res=await axios.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload:res.data
        });
    } catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

//Add Likes
export const addLike =(id)=>async dispatch =>{
    try{
        const res=await axios.put(`api/posts/like/${id}`);

        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });
    } catch(err){
        
        const error = err.response.data.msg;
        
        if (error) {
            dispatch(setAlert(error, 'danger'));
          }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

//Remove Likes
export const removeLike =(id)=>async dispatch =>{
    try{
        const res=await axios.put(`api/posts/unlike/${id}`);

        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });
    } catch(err){
        const error = err.response.data.msg;
        
        if (error) {
            dispatch(setAlert(error, 'danger'));
          }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

//Add a Post
export const addPost =(text,image)=>async dispatch =>{
    
    const config = {
        headers:{
        'Content-Type':'application/json'
        }
    }
    try{
        
        const data = new FormData();
        
        data.append('file',image);
        data.append('upload_preset','devnetwork');
        data.append('cloud_name','devnetwork');

        const response = await fetch('https://api.cloudinary.com/v1_1/devnetwork/image/upload', {
        method:'POST',
        body:data
        });
        const img_url = await response.json();
        var url = await img_url.secure_url;
       
        const body = JSON.stringify({text,url});
    
        const res = await axios.post('api/posts/',body,config);

        dispatch({
            type:ADD_POST,
            payload:res.data
        });
  
        dispatch(setAlert('Post Added!', 'success'));
        
        
    } catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
    
}
//Delete a Post
export const deletePost =(id)=>async dispatch =>{
    if(window.confirm('Are you sure? The Post will be deleted!'))
    {
    try{
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type:DELETE_POST,
            payload:id
        });
    
        dispatch(setAlert('Post Removed!', 'success'));
    } catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

}

//Get Post
export const getPost =id=>async dispatch =>{
    try{
        const res=await axios.get(`/api/posts/${id}`);

        dispatch({
            type:GET_POST,
            payload:res.data
        });
    } catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
   
}
//Add a Comment
export const addComment =(postId,text,image)=>async dispatch =>{
    
    const config = {
        headers:{
        'Content-Type':'application/json'
        }
    }
    try{
        
        const data = new FormData();
        
        data.append('file',image);
        data.append('upload_preset','devnetwork');
        data.append('cloud_name','devnetwork');

        const response = await fetch('https://api.cloudinary.com/v1_1/devnetwork/image/upload', {
        method:'POST',
        body:data
        });
        const img_url = await response.json();
        var url = await img_url.secure_url;
       
        const body = JSON.stringify({text,url});
        
        const res = await axios.post(`/api/posts/comment/${postId}`,body,config);
        
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        });
  
        dispatch(setAlert('Comment Added!', 'success'));
        
        
    } catch(err){
        const errors = err.response.data.errors;
       
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
    
}
//Delete a Comment
export const deleteComment =(id,commentId)=>async dispatch =>{
    if(window.confirm('Are you sure? The Comment will be deleted!'))
    {
    try{
    
        await axios.delete(`/api/posts/comment/${id}/${commentId}`);

        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        });
  
        dispatch(setAlert('Comment Removed!', 'success'));
        
        
    } catch(err){
        const errors = err.response.data.errors;
       
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
    
}
}