import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

 class EditEmployee extends Component {
     constructor(props) {
         super(props);
         //create refs
         this.firstNameInput = React.createRef();
         this.lastNameInput = React.createRef();
         this.emailInput = React.createRef();
         this.phoneInput = React.createRef();
         this.addressInput = React.createRef();
         this.joiningdateInput = React.createRef();
         this.positionInput = React.createRef();
         this.groupInput = React.createRef();
         this.supervisorInput = React.createRef();
     }

     onSubmit = e =>{
         e.preventDefault();

         const { employee, firestore, history } =this.props;

         //update client
         const updEmployee = {
             firstName: this.firstNameInput.current.value,
             lastName: this.lastNameInput.current.value,
             email: this.emailInput.current.value,
             phone: this.phoneInput.current.value,
             address: this.addressInput.current.value,
             joiningdate: this.joiningdateInput.current.value,
             position: this.positionInput.current.value,
             group: this.groupInput.current.value,
             supervisor: this.supervisorInput.current.value
            
         }

         //update in firestore
         firestore.update({ collection: 'employees', doc: employee.id},  updEmployee)
         .then(history.push('/'));



     }


  render() {
      const { employee } = this.props;
      
      if(employee){
        return (
            <div>
            <div className="row">
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                   < i className="fas fa-arrow-circle-left"/>  Back to Dashboard
                </Link>
              </div>
            </div>
   
           <div className="card">
            <div className="card-header">Edit Employee </div>
                <div className="card-body">
                   <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                       <input type="text" className="form-control"
                       name="firstName" minLength="2" required
                       ref={this.firstNameInput}
                       defaultValue={employee.firstName}
                       />
                   </div>  
                   <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                       <input type="text" className="form-control"
                       name="lastName" minLength="2" required
                       ref={this.lastNameInput}
                       defaultValue={employee.lastName}
                       />
                   </div>  
                   <div className="form-group">
                      <label htmlFor="email">Email</label>
                       <input type="email" className="form-control"
                       name="email"
                       ref={this.emailInput} 
                       defaultValue={employee.email}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                       <input type="text" className="form-control"
                       name="phone" minLength="10" required
                       ref={this.phoneInput}
                       defaultValue={employee.phone}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="address">Address</label>
                       <input type="text" className="form-control"
                       name="address" required
                       ref={this.addressInput}
                       defaultValue={employee.address}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="joiningdate">Joining Date</label>
                       <input type="date" className="form-control"
                       name="joiningdate" required
                       ref={this.joiningdateInput}
                       defaultValue={employee.joiningdate}
                       />
                   </div>

                     <div className="form-group">
                     <label htmlFor="group">Group</label>
                    <select type="text" className="form-control"
                    name="group"
                    ref={this.groupInput}
                    defaultValue={employee.group}
                    >
                     <option>Technical Group</option>
                     <option>Marketing Group</option>
                     <option>Managment Group</option>
                     <option>Finance Group</option>
                    </select>
                </div>

                   <div className="form-group">
                      <label htmlFor="position">Position</label>
                       <input type="text" className="form-control"
                       name="position" required
                       ref={this.positionInput}
                       defaultValue={employee.position}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="supervisor">Supervisor</label>
                       <input type="text" className="form-control"
                       name="supervisor" required
                       ref={this.supervisorInput}
                       defaultValue={employee.supervisor}
                       />
                   </div>                  
                   <input type="submit" value="Submit" className="btn btn-primary btn-block"
                   />
                   </form>
                </div>
              </div>
         </div>
        )
      }else {
          return <Spinner />

      }  
  }
}

EditEmployee.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'employees', storeAs: 'employee', doc: props.match.params.id }
    ]),
        connect(({ firestore: {ordered }, settings }, props) => ({
            employee: ordered.employee && ordered.employee[0]
        }))

)(EditEmployee);
