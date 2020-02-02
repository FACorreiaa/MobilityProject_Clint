import axios from 'axios';

import {
  GET_VEHICLES,
  GET_BALANCE,
  UPDATE_BALANCE,
  GET_RENTAL_METHODS,
  POST_CHECKIN,
  GET_CONSULT,
  PUT_CHECKOUT,
  PUT_PAYMENT,
  GET_USER_NOTIFIED
} from './types';

export const getVehicles = () => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/vehicles`
      )
      .then(vehicles => {
        return dispatch({
          type: GET_VEHICLES,
          payload: vehicles.data
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

export const getRentalMethods = () => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/rental/rentalMethods`
      )
      .then(methods => {
        return dispatch({
          type: GET_RENTAL_METHODS,
          payload: methods.data
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

export const getBalance = id => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/users/${id}/balance`
      )
      .then(balance => {
        return dispatch({
          type: GET_BALANCE,
          payload: balance.data
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

export const updateBalance = (id, balance) => {
  return dispatch => {
    return axios
      .put(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/users/${id}/balance/${balance}`
      )
      .then(updateBalance => {
        return dispatch({
          type: UPDATE_BALANCE,
          payload: updateBalance
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

///api/v1/rental/checkin/user/:user/vehicle/:id/:rentalMethod/lat/:lat/lon/:lon
export const postCheckIn = (user, id, rentalMethod, lat, lon) => {
  return dispatch => {
    return axios
      .post(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/rental/checkin/user/${user}/vehicle/${id}/${rentalMethod}/lat/${lat}/lon/${lon}`
      )
      .then(checkin => {
        return dispatch({ type: POST_CHECKIN, payload: checkin.data });
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

///api/v1/rental/:client
export const getConsult = id => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/rental/consult/${id}`
      )
      .then(consult => {
        return dispatch({
          type: GET_CONSULT,
          payload: consult.data
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

///api/v1/rental/checkout/:rental/lat/:lat/lon/:lon
export const updateCheckout = (id, vehicle, lat, lon, address) => {
  return dispatch => {
    return axios
      .put(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/rental/checkout/${id}/vehicle/${vehicle}/lat/${lat}/lon/${lon}/address/${address}`
      )
      .then(checkout => {
        return dispatch({
          type: PUT_CHECKOUT,
          payload: checkout.data
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

///api/v1/rental/payment/user/:user/:id
export const updatePayment = id => {
  return dispatch => {
    return axios
      .put(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/rental/payment/${id}`
      )
      .then(payment => {
        return dispatch({
          type: PUT_PAYMENT,
          payload: payment.data
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

///api/v1/users/:id
export const getNotifiedUser = id => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/users/${id}`
      )
      .then(notifiedUser => {
        return dispatch({
          type: GET_USER_NOTIFIED,
          payload: notifiedUser.data
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
