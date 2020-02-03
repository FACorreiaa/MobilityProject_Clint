import axios from 'axios';

import { GET_CHARTS_PLACES, GET_CHECKIN_DASH } from './types';

//see dashboard charts
export const getOccupancy = () => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}/api/v1/dashboard/places/occupancy_rate`
      )
      .then(places => {
        let labels = [];
        let values = [];
        for (let i = 0; i < places.data.length; i++) {
          let place = places.data[i];
          labels[i] = place.street;
          values[i] = place.occupancy;
        }
        let charts_places = {
          labels: labels,
          data: values
        };
        return dispatch({
          type: GET_CHARTS_PLACES,
          payload: charts_places
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

//see dashboard charts
export const getCheckinDash = () => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_HOST}/api/v1/dashboard/rentals/date/count`)
      .then(checkins => {
        let labels = [];
        let values = [];
        for (let i = 0; i < checkins.data.length; i++) {
          let checkin = checkins.data[i];
          labels[i] = checkin._id.date;
          values[i] = checkin.count;
        }

        let charts_checkin = {
          labels: labels,
          data: values
        };
        return dispatch({
          type: GET_CHECKIN_DASH,
          payload: charts_checkin
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
