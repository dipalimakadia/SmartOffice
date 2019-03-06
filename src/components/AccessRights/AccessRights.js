import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import './Toggle.css';



 class AccessRights extends Component {
   
    
    constructor(props) {
        super(props);
        //create refs
        this.Input = React.createRef();  

    } 

    state = {Toggle: true};

    
  handleClick = () => {
    this.setState ({
      Toggle: !this.state.Toggle
     
    });
    console.log(this.state.Toggle)
      
  } 


onSubmit = e =>{
    e.preventDefault();

    const { employee, firestore, history } =this.props;

    //update client
    const updEmployee = {
       onoff: this.onoffInput.current.value
    }

    //update in firestore
    firestore.update({ collection: 'employees', doc: employee.id},  updEmployee)
    .then(history.push('/accessrights'));



}



  render() {

    
      const {employees} = this.props;
  
      if (employees){
         return (
             <div>
                 <div className="row">
                   <div className="col-md-6">
                       <h2>
                         {' '}
                          <i className="fas fa-users"/>Access Rights {' '}
                       </h2>
                   </div>
                    <table className="table table-striped">
                     <thead className="thead-inverse">
                         <tr>
                             <th>Name</th>
                             <th>Group</th>
                             <th>Position</th>
                             <th>Lock</th>
                             <th>Date</th>
                             <th>Day</th>
                             <th>Entry Time</th>
                             <th>Exit Time</th>
                             <th>Allow Times</th>
                             <th>On/Off</th>
                             <th />
                         </tr>
                     </thead>
                     <tbody>
  
                         {employees.map(employee =>(
                            <tr key={employee.id}>
                              <td>{employee.firstName} {employee.lastName}</td>
                              <td>{employee.group}</td>
                              <td>{employee.position}</td>
                              <td>{employee.lock}</td>
                              <td>{employee.date}</td>
                              <td>{employee.day}</td>
                              <td>{employee.entrytime}</td>
                              <td>{employee.exittime}</td>
                              <td>{employee.times}</td>
                              <td>
                              
            
                             <label class="switch"  >
                            
                            <input type="checkbox"   onClick={this.handleClick}/>
                            <span class="slider round" > {this.state.Toggle ? 'OFF' : 'ON'} </span> 
                            </label>
                                         
                              </td>
                              <td>
                                  <Link to={`/accessrights/edit/${employee.id}`} className= "btn btn-secondary btn-sm">
                                  <i className="fas fa-arrow-circle-right"/> Edit Details
                                  </Link>
                              </td>
                            </tr>
                         ))}
                     </tbody>
                    </table>
                 </div>
             </div>
         );
      } else {
          return <Spinner/>
      }
  }
}

AccessRights.propTypes = {
    firestore: PropTypes.object.isRequired,
    employees: PropTypes.array
}



export default compose(
    firestoreConnect([{
        collection: 'employees' }]),
        connect((state, props) => ({
            employees: state.firestore.ordered.employees
        }))

)(AccessRights);
