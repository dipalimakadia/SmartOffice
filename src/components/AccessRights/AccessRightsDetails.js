import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';



 class AccessRightsDetails extends Component {
    
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
                <Link to="/accessrights" className="btn btn-link">
                   < i className="fas fa-arrow-circle-left"/>  Back to AccessRights
                </Link>
                </div>
                <div className="col-md-6">
                    <div className="btn-group float-right">
                       <Link to={`/accessrights/edit/${employee.id}`} className="btn btn-dark">
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
                      <li className="list-group-item"> Lock: {employee.lock}</li>
                      <li className="list-group-item"> Day: {employee.day}</li>
                      <li className="list-group-item"> Date: {employee.date}</li>
                      <li className="list-group-item"> Entry Time: {employee.entrytime}</li>
                      <li className="list-group-item"> Exit Time: {employee.exittime}</li>
                      <li className="list-group-item"> Times: {employee.times}</li>
                    </ul>             
                </div>
            </div>
          )
        }else{
          return<Spinner />
        } 
    }
}

AccessRightsDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'employees', storeAs: 'employee', doc: props.match.params.id }
    ]),
        connect(({ firestore: {ordered } }, props) => ({
            employee: ordered.employee && ordered.employee[0]
        }))

)(AccessRightsDetails);