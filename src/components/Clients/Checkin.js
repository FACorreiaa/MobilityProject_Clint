import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  getVehicles,
  getRentalMethods,
  postCheckIn,
  getConsult,
  getNotifiedUser
} from '../../actions/clientActions';
import ClientNav from './ClientNav';
import { Button, Icon } from 'react-materialize';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import '@material/react-snackbar/dist/snackbar.css';
import { Snackbar } from '@material/react-snackbar';
import { dropdown } from './utils/dropdown';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

//const options = ['one', 'two', 'three'];
//const rental = ['minutes', 'pack'];
class Checkin extends Component {
  componentDidMount() {
    this.props.getVehicles();
    this.props.getRentalMethods();
    this.props.getNotifiedUser(this.props.auth.user._id);
    this.timer = setInterval(() => this.getNotification(), 2000);
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null; // here...
  }

  getNotification = () => {
    const notified = this.props.clients.notifiedUser.notified;
    if (notified) {
      return (
        <div className='app-container'>
          <ReactNotification />
          {store.addNotification({
            title: 'Wrong Parking!',
            message: 'Your vehicle is in the wrong place',
            type: 'warning',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'zoomIn'],
            animationOut: ['animated', 'zoomOut'],
            dismiss: {
              duration: 1000,
              onScreen: true
            }
          })}
        </div>
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      vehicle: '',
      rentalMethod: '',
      lat: '',
      lon: '',
      disabled: false,
      checkin: false,
      price: '',
      previewCost: '',
      timeSpent: '',
      canRender: false
    };
  }

  _onSelect = e => {
    let value = e.target.value;
    this.setState({ vehicle: value }, () => {});
    return value.description;
  };

  _onMethodSelect = e => {
    let value = e.target.value;
    this.setState({ rentalMethod: value }, () => {});
    return value;
  };

  onSubmit = e => {
    e.preventDefault();

    const checkin = {
      user: this.props.auth.user._id,
      id: this.state.vehicle._id,
      rentalMethod: this.state.rentalMethod,
      lat: JSON.stringify(this.state.lat),
      lon: JSON.stringify(this.state.lon)
    };

    this.props.postCheckIn(
      checkin.user,
      checkin.id,
      checkin.rentalMethod,
      checkin.lat,
      checkin.lon
    );

    this.setState(prevState => ({
      disabled: !prevState.disabled,
      checkin: !prevState.checkin
    }));

    this.props.clients.isCheckIn = !this.props.clients.isCheckIn;
  };

  onConsult = e => {
    e.preventDefault();

    this.props.getConsult(this.props.clients.checkin._id);

    setTimeout(() => {
      this.setState(prevState => ({
        canRender: !prevState.canRender
      }));
    }, 100);
  };

  render() {
    const { user } = this.props.auth;
    const { vehicles } = this.props.clients;

    let reduced = vehicles.reduce(function(filtered, option) {
      if (option.available) {
        let someNewValue = { _id: option._id, description: option.description };
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    return (
      <>
        <ClientNav />
        <div className='container' style={{ textAlign: 'center' }}>
          <p className='flow-text grey-text text-darken-1'>
            Hello {user.username}! Checkin with us now!
          </p>

          <div className='row'>
            <section>
              <p className='flow-text grey-text text-darken-1'>
                Pick your Vehicle
              </p>
              <div className='col s6'>
                <Select
                  value={this.state.vehicle}
                  onChange={e => this._onSelect(e)}
                  input={
                    <Input name='vehicle' id='vehicle-label-placeholder' />
                  }
                  displayEmpty
                  name='vehicle'
                  className={dropdown.selectEmpty}
                >
                  <MenuItem value={this.state.vehicle}>
                    <em>Choose Your Vehicle</em>{' '}
                  </MenuItem>{' '}
                  {reduced.map((item, key) => (
                    <MenuItem value={item} key={key} name='vehicle'>
                      {' '}
                      {item.description}{' '}
                    </MenuItem>
                  ))}{' '}
                </Select>{' '}
              </div>
              <div className='col s6 result'>
                Your vehicle is
                <strong> {this.state.vehicle.description} </strong>
              </div>
            </section>
          </div>
          <div className='row'>
            <section>
              <h5 className='flow-text grey-text text-darken-1'>
                Pick your rental method
              </h5>
              <div className='col s6'>
                <Select
                  value={this.state.rentalMethod}
                  onChange={e => this._onMethodSelect(e)}
                  input={<Input name='vehicle' id='method-label-placeholder' />}
                  displayEmpty
                  name='vehicle'
                  className={dropdown.selectEmpty}
                >
                  <MenuItem value={this.state.rentalMethod}>
                    <em>Choose your rental Method </em>{' '}
                  </MenuItem>{' '}
                  {this.props.clients.methods.map((item, key) => (
                    <MenuItem value={item} key={key} name='methods'>
                      {' '}
                      {item}{' '}
                    </MenuItem>
                  ))}{' '}
                </Select>{' '}
              </div>
              <div className='result col s6'>
                Your Rental Method is
                <strong> {this.state.rentalMethod} </strong>
              </div>
            </section>
          </div>
          <section>
            <div className='center-align'>
              <Button
                node='button'
                type='submit'
                onClick={this.onSubmit}
                disabled={this.state.disabled}
              >
                Checkin
                <Icon right>send</Icon>
              </Button>
              {this.getNotification()}
            </div>
          </section>
          <div className='flow-text grey-text text-darken-2'>
            {this.state.checkin ? (
              <div>
                <Snackbar message='You are checked!' actionText='x' />

                <Button node='button' type='submit' onClick={this.onConsult}>
                  Check your time estimative!
                  <Icon right>send</Icon>
                </Button>
                {this.state.canRender ? (
                  <section>
                    <div>
                      <span>
                        Base price is:{' '}
                        <strong>{this.props.clients.consult.price}</strong>
                      </span>
                    </div>
                    <div>
                      <span>
                        Your preview cost is:{' '}
                        <strong>
                          {this.props.clients.consult.previewCost}
                        </strong>
                      </span>
                    </div>
                    <div>
                      <span>
                        Time spend:{' '}
                        <strong>{this.props.clients.consult.timeSpent}</strong>
                      </span>
                    </div>
                    <NavLink
                      to={{
                        pathname: '/checkout',
                        state: { ...this.props.clients.consult }
                      }}
                    >
                      <Button node='button' type='submit'>
                        Checkout
                        <Icon right>send</Icon>
                      </Button>
                    </NavLink>
                    {this.props.clients.consult.paymentComplete ? (
                      <Link to='/checkout'>
                        Payment incomplete. Click here to redirect!
                      </Link>
                    ) : (
                      ''
                    )}
                  </section>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <Snackbar message='You are not checked in!' actionText='x' />
            )}
          </div>
        </div>
      </>
    );
  }
}

Checkin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  checkin: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  getRentalMethods: PropTypes.func.isRequired,
  postCheckIn: PropTypes.func.isRequired,
  getConsult: PropTypes.func.isRequired,
  getNotifiedUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vehicles: state.vehicles,
  methods: state.methods,
  checkin: state.checkin,
  consult: state.consult,
  clients: state.clients,
  notifiedUser: state.notifiedUser
});

export default connect(mapStateToProps, {
  logoutUser,
  getVehicles,
  getRentalMethods,
  postCheckIn,
  getConsult,
  getNotifiedUser
})(Checkin);
