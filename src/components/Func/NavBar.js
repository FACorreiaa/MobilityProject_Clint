import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

export class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        {!this.props.auth.isAuthenticated ? (
          <nav style={{ fontFamily: 'monospace' }}>
            <div className='nav-wrapper'>
              <ul id='nav-mobile' className='center hide-on-med-and-down'>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav style={{ fontFamily: 'monospace' }}>
            <div className='nav-wrapper'>
              {/*             <b>Hey there,</b> {user.username}
               */}{' '}
              <ul id='nav-mobile' className='center hide-on-med-and-down'>
                <li>
                  <Link to='/notifyUsers'>Notify Users</Link>
                </li>
                <li>
                  <Link to='/searchVehicles'>
                    <button onClick={this.onLogoutClick}>Logout</button>
                  </Link>
                </li>
              </ul>
              <ul className='right'>
                <li>
                  <span style={{ display: 'flex' }}>
                    {' '}
                    <strong>Hey there, {user.username}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  history: state.history
});
export default connect(mapStateToProps, { logoutUser })(NavBar);
