import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';



 class EmployeeDetails extends Component {
    
         //delete client
         onDeleteClick = () => {
             const {employee, firestore, history } = this.props;

             firestore.delete({collection: 'employees', doc: employee.id})
              .then(history.push('/'));
         };

     onChange = e => this.setState({[e.target.name]: e.target.value});
 
 
     render() {
      const {employee } = this.props;
     
      if(employee){
        return (
        <div>
            <div className="row">
               <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                   < i className="fas fa-arrow-circle-left"/>  Back to Dashboard
                </Link>
                </div>
                <div className="col-md-6">
                    <div className="btn-group float-right">
                       <Link to={`/employee/edit/${employee.id}`} className="btn btn-dark">
                            Edit
                         </Link>
                         <button onClick={this.onDeleteClick} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="card">
                <h3 className="card-header">
                   {employee.firstName} {employee.lastName} 
                </h3>
            
                    <hr/> 
                    <ul className="list-group">
                      <li className="list-group-item"> Email: {employee.email}</li>
                      <li className="list-group-item"> Phone: {employee.phone}</li>
                      <li className="list-group-item"> Address: {employee.address}</li>
                      <li className="list-group-item"> Group: {employee.group}</li>
                      <li className="list-group-item"> Position: {employee.position}</li>
                      <li className="list-group-item"> Supervisor: {employee.supervisor}</li>
                    </ul>             
                </div>
            </div>
          )
        }else{
          return<Spinner />
        } 
    }
}

EmployeeDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'employees', storeAs: 'employee', doc: props.match.params.id }
    ]),
        connect(({ firestore: {ordered } }, props) => ({
            employee: ordered.employee && ordered.employee[0]
        }))

)(EmployeeDetails);