import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { USER_LOADING, SET_CURRENT_USER } from './types';

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_HOST}/api/v1/register`, userData)
    .then(res => history.push('/login'))
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

//login
export const loginUser = userData => dispatch => {
  axios
    .post(`${process.env.REACT_APP_HOST}/api/v1/login`, userData)
    .then(res => {
      //Save to localstorage
      //Set token to localStorage

      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      //set token to auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

//Set loggedin uset
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');

  //remove auth header for future requests
  setAuthToken(false);

  //set current user to empty object, set isAuth to false
  dispatch(setCurrentUser({}));
};
