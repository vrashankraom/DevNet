import axios from 'axios';
import {setAlert} from './alert';
import {GET_POSTS,POST_ERROR, UPDATE_LIKES,ADD_POST,DELETE_POST,CLEAR_POSTS} from './types';

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
export const addPost =(FormData)=>async dispatch =>{
    
    const config = {
        headers:{
        'Content-Type':'application/json'
        }
    }
    try{
        const res = await axios.post(`api/posts/`,FormData,config);

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
    
    try{
        await axios.delete(`api/posts/${id}`);

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