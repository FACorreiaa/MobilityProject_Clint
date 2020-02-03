import axios from 'axios';

import { NOTIFY_USER, GET_VALID_USERS } from './types';

export const updateNotifications = id => {
  return dispatch => {
    return axios
      .put(`${process.env.REACT_APP_HOST}/api/v1/notify/${id}`)
      .then(user => {
        return dispatch({
          type: NOTIFY_USER,
          payload: user
        });
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
};

export const validUsers = () => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_HOST}/api/v1/users/func/validUsers`)
      .then(validated => {
        return dispatch({
          type: GET_VALID_USERS,
          payload: validated.data
        });
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
};

///api/v1/users/func/validUsers
