import axios from 'axios';

import {
  GET_VALIDATE_USERS,
  UPDATE_VALIDATE_USERS,
  GET_RENTAL_DATA
} from './types';

export const getValidUsers = () => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/users/admin/waitvalidation`
      )
      .then(validUsers => {
        return dispatch({
          type: GET_VALIDATE_USERS,
          payload: validUsers.data
        });
      })

      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error);
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

export const updateUsers = (id, userId) => {
  return dispatch => {
    return axios
      .put(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/users/${id}/validation/${userId}`
      )
      .then(updateUser => {
        return dispatch({
          type: UPDATE_VALIDATE_USERS,
          payload: updateUser
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

///api/v1/rental/check
export const getRentalData = () => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/rental/check`
      )
      .then(rental => {
        return dispatch({
          type: GET_RENTAL_DATA,
          payload: rental.data
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
