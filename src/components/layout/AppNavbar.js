import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';


class AppNavbar extends Component {
   state = {
     isAuthenticated: false
   }

   static getDerivedStateFromProps(props, state){
     const { auth } = props;

     if(auth.uid){
       return { isAuthenticated: true}

     } else {   
      return {isAuthenticated: false}
   }
  }

  onLogoutClick = (e) => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();

  };


  render() {
    const {isAuthenticated} = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;

    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
          <h4>Smart Office</h4>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto" >
             {isAuthenticated ? (
            <li className="nav-item">
            <Link to="/" className="nav-link">
             Dashboard
            </Link>
              </li>
          ) : null }
         </ul>
         {isAuthenticated ? (
            <ul className="navbar-nav ml-auto"> 
               <li className="nav-item">
                 <Link to="/accessrights" className="nav-link">
                   AccessRights
                 </Link>
              </li>           
               <li className="nav-item">
                 <Link to="/managegroups" className="nav-link">
                   ManageGroups
                 </Link>
              </li>
              <li className="nav-item">
                 <Link to="/managelogs" className="nav-link">
                   ManageLogs
                 </Link>
              </li>
              <li className="nav-item">
                 <a href="#!" className="nav-link">
                   { auth.email }
                 </a>
              </li>
              <li className="nav-item">
                 <Link to="/settings" className="nav-link">
                   Settings
                 </Link>
              </li>
              <li className="nav-item">
                 <a href="#!" className="nav-link" 
                  onClick={this.onLogoutClick} >
                  Logout
                 </a>
              </li>
            </ul>
         ): null } 
         { allowRegistration && !isAuthenticated ? (
            <ul className="navbar-nav ml-auto">            
               <li className="nav-item">
                 <Link to="/login" className="nav-link">
                   Login
                 </Link>
              </li>
              <li className="nav-item">
                 <Link to="/register" className="nav-link">
                   Register
                 </Link>
              </li>             
            </ul>
         ): null } 
      </div>
    </div>
  </nav>
    );
  }
}
AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);