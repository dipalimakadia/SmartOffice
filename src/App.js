import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layout/AppNavbar';
import Dashhboard from './components/layout/Dashboard';
import AddEmployee from './components/employees/AddEmployee';
import EmployeeDetails from './components/employees/EmployeeDetails';
import EditEmployee from './components/employees/EditEmployee';
import Login from './components/auth/Login';
import Settings from './components/settings/Settings';
import Register from './components/auth/Register';
import ManageGroups from './components/Groups/ManageGroups';
import ManageLogs from './components/Logs/ManageLogs';
import AccessRights from './components/AccessRights/AccessRights';
import AccessRightsDetails from './components/AccessRights/AccessRightsDetails';
import EditAccessRights from './components/AccessRights/EditAccessRights';


import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
      <AppNavbar />
      <div className="container">
        <Switch>
           <Route exact path="/" component ={UserIsAuthenticated(Dashhboard)}/>
           <Route exact path="/employee/add" component = {UserIsAuthenticated(AddEmployee)} />
           <Route exact path="/employee/edit/:id" component ={UserIsAuthenticated(EditEmployee)} />
           <Route exact path="/employee/:id" component ={UserIsAuthenticated(EmployeeDetails)} /> 
           <Route exact path="/login" component ={UserIsNotAuthenticated(Login)}/>
           <Route exact path="/settings" component ={UserIsAuthenticated(Settings)}/>
           <Route exact path="/register" component ={UserIsNotAuthenticated(Register)} />
           <Route exact path="/managegroups" component ={UserIsAuthenticated(ManageGroups)}/>
           <Route exact path="/managelogs" component ={UserIsAuthenticated(ManageLogs)}/>
           <Route exact path="/accessrights" component ={UserIsAuthenticated(AccessRights)}/>
           <Route exact path="/accessrights/edit/:id" component ={UserIsAuthenticated(EditAccessRights)} />
           <Route exact path="/accessrights/:id" component ={UserIsAuthenticated(AccessRightsDetails)} /> 

          
           />
           </Switch>
      </div>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
