import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Charts from '../Dashboard/Charts';
import Clients from '../Clients/Clients';
import SearchVehicles from '../Clients/SearchVehicles';
import Balance from '../Clients/Balance';
import CheckIn from '../Clients/Checkin';
import Checkout from '../Clients/Checkout';
import ValidateUsers from '../Admin/ValidateUsers';
import CheckParkingData from '../Admin/CheckParkingData';
import MapParkings from '../Admin/MapParkings';
import NotifyUsers from '../Func/NotifyUsers';

export default {
  routes: [
    {
      component: Charts,
      url: '/charts',
      roles: ['admin']
    },
    {
      component: MapParkings,
      url: '/marParkings',
      roles: ['admin']
    },
    {
      component: CheckParkingData,
      url: '/checkParkings',
      roles: ['admin']
    },
    {
      component: ValidateUsers,
      url: '/validateusers',
      roles: ['admin']
    },
    {
      component: NotifyUsers,
      url: '/notifyUsers',
      roles: ['employee']
    },
    {
      component: Clients,
      url: '/main',
      roles: ['client']
    },
    {
      component: Balance,
      url: '/balance',
      roles: ['client']
    },
    {
      component: CheckIn,
      url: '/checkin',
      roles: ['client']
    },
    {
      component: Checkout,
      url: '/checkout',
      roles: ['client']
    },
    {
      component: Login,
      url: '/login',
      roles: []
    },
    {
      component: SearchVehicles,
      url: '/searchVehicles',
      roles: ['client']
    },
    {
      component: SearchVehicles,
      url: '/',
      roles: []
    },
    {
      component: Register,
      url: '/register',
      roles: []
    }
  ]
};
