  
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//Here we call dispatch and fill details with an id for the perticular type
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  //Remove alert after 5 sec
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};