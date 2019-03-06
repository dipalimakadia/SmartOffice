import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

 class EditAccessRights extends Component {
     constructor(props) {
         super(props);
         //create refs
         this.lockInput = React.createRef();
         this.dateInput = React.createRef();
         this.dayInput = React.createRef();
         this.entrytimeInput = React.createRef();
         this.exittimeInput = React.createRef();
         this.timesInput = React.createRef();
     }

     onSubmit = e =>{
         e.preventDefault();

         const { employee, firestore, history } =this.props;

         //update client
         const updEmployee = {
            lock: this.lockInput.current.value,
            date: this.dateInput.current.value,
            day: this.dayInput.current.value,
            entrytime: this.entrytimeInput.current.value,
            exittime: this.exittimeInput.current.value,
            times: this.timesInput.current.value
            
         }

         //update in firestore
         firestore.update({ collection: 'employees', doc: employee.id},  updEmployee)
         .then(history.push('/accessrights'));



     }


  render() {
      const { employee } = this.props;
      
      if(employee){
        return (
            <div>
            <div className="row">
            <div className="col-md-6">
                <Link to="/accessrights" className="btn btn-link">
                   < i className="fas fa-arrow-circle-left"/>  Back to AccessRights
                </Link>
              </div>
            </div>
   
           <div className="card">
            <div className="card-header">Edit AccessRights </div>
                <div className="card-body">
                <h3 >
                   {employee.firstName} {employee.lastName} 
                </h3>
                <br/>
                   <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                      <label htmlFor="lock">Lock</label>
                      <select type="text" className="form-control"
                       name="lock"
                       ref={this.lockInput}
                       defaultValue={employee.lock}
                    >
                  <option>Locks</option>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                  <option>L4</option>
                  <option>L5</option>
                  <option>L6</option>
                  </select>
                   </div>  
                   <div className="form-group">
                      <label htmlFor="day">Day</label>
                      <select type="text" className="form-control"
                       name="day"
                       ref={this.dayInput}
                       defaultValue={employee.day}
                    >
                    <option> Days</option>
                    <option> Monday</option>
                    <option> Tuesday</option>
                    <option> Wednesday</option>
                    <option> Friday</option>
                    <option> Saturday</option>
                    <option> Sunday</option>
                    <option> All Days</option>
                    </select>
                    </div>
                   <div className="form-group">
                      <label htmlFor="date">Date</label>
                       <input type="date" className="form-control"
                       name="date"
                       ref={this.dateInput} 
                       defaultValue={employee.date}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="entrytime">Entry Time</label>
                       <input type="time" className="form-control"
                       name="entrytime" min="9:00" max="18:00"  required
                       ref={this.entrytimeInput}
                       defaultValue={employee.entrytime}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="exittime">Exit Time</label>
                       <input type="time" className="form-control"
                       name="exittime" min="9:00" max="18:00"  required
                       ref={this.exittimeInput}
                       defaultValue={employee.exittime}
                       />
                   </div>
                   <div className="form-group">
                      <label htmlFor="times">Allow Times</label>
                      <select type="text" className="form-control"
                       name="times"
                       ref={this.timesInput}
                       defaultValue={employee.times}
                    >
                     <option>Allow Times</option>
                     <option>1 Time</option>
                     <option>2 Times</option>
                     <option>3 Times</option>
                     <option>4 Times</option>
                     <option>5 Times</option>
                     </select>
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

EditAccessRights.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'employees', storeAs: 'employee', doc: props.match.params.id }
    ]),
        connect(({ firestore: {ordered }, settings }, props) => ({
            employee: ordered.employee && ordered.employee[0]
        }))

)(EditAccessRights);
