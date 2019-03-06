import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import {compose } from 'redux';
//import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';




 class AddEmployee extends Component {
      state = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          joiningdate: '',
          group:'',
          position: '',
          supervisor: '',
          lock: '',
          date: '',
          day: '',
          entrytime: '',
          exittime: '',
          times: '',
          lstatus: '',
          onoff: ''
      };

      onSubmit = e => {
          e.preventDefault();

          const newEmployee = this.state;


          const { firestore, history } = this.props;

        
          firestore.add({ collection: 'employees'}, newEmployee)
          .then(history.push('/'));
     
      };

      onChange = e => this.setState({ [e.target.name]: e.target.value });
     

  render() {

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
         <div className="card-header">Add Employee </div>
             <div className="card-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                   <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control"
                    name="firstName" minLength="2" required
                    onChange={this.onChange}
                    value={this.state.firstName}
                    />
                </div>

                <div className="form-group">
                   <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control"
                    name="lastName" minLength="2" required
                    onChange={this.onChange}
                    value={this.state.lastName}
                    />
                </div>
                <div className="form-group">
                   <label htmlFor="email">Email</label>
                    <input type="email" className="form-control"
                    name="email" 
                    onChange={this.onChange}
                    value={this.state.email}
                    />
                </div>
                <div className="form-group">
                   <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control"
                    name="phone" minLength="10" required
                    onChange={this.onChange}
                    value={this.state.phone}
                    />
                </div>
                <div className="form-group">
                     <label htmlFor="address">Address</label>
                    <input type="text" className="form-control"
                    name="address"
                    onChange={this.onChange}
                    value={this.state.address}
                    />
                </div>
                <div className="form-group">
                   <label htmlFor="joiningdate">Joiningdate</label>
                    <input type="date" className="form-control"
                    name="joiningdate"  required
                    onChange={this.onChange}
                    value={this.state.joiningdate}
                    />
                </div>
                
                <div className="form-group">
                     <label htmlFor="group">Group</label>
                    <select type="text" className="form-control"
                    name="group" defaultValue="Group" required
                    onChange={this.onChange}
                    value={this.state.group}
                    >
                     <option> Groups</option>
                     <option>Technical Group</option>
                     <option>Marketing Group</option>
                     <option>Managment Group</option>
                     <option>Finance Group</option>
                    </select>
                </div>
    
                 <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input type="text" className="form-control"
                    name="position"
                    onChange={this.onChange}
                    value={this.state.position}
                    />
                </div>

                <div className="form-group">
                     <label htmlFor="supervisor">Supervisor</label>
                    <input type="text" className="form-control"
                    name="supervisor"
                    onChange={this.onChange}
                    value={this.state.supervisor}
                    />
                </div>

                <br/>
                <div className="card-header">Access Details </div>
                <br/>

                <div className="form-group">
                <label htmlFor="lock">Lock</label>
                 <select type="checkbox" className="form-control"
                  name="lock" defaultValue="Lock"
                  onChange={this.onChange}
                  value={this.state.lock}>
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
                   <label htmlFor="date"> Date</label>
                    <input type="date" className="form-control"
                    name="date" required
                    onChange={this.onChange}
                    value={this.state.date}
                     />
                    </div>

                    <div className="form-group">
                    <label htmlFor="day"> Day</label>
                    <select type="text" className="form-control"
                    name="day" defaultValue="Days"
                    onChange={this.onChange}
                    value={this.state.day}
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
                    <label htmlFor="time">Entry Time</label>
                    <input type="time" className="form-control"
                    name="entrytime"  min="9:00" max="18:00" required
                    onChange={this.onChange}
                    value={this.state.entrytime}
                     />
                     </div>

                    <div className="form-group">
                    <label htmlFor="time">Exit Time</label>
                    <input type="time" className="form-control"
                    name="exittime"  min="9:00" max="18:00" required
                    onChange={this.onChange}
                    value={this.state.exittime}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="allow">Allow Times</label>
                    <select type="checkbox" className="form-control"
                    name="times" defaultValue="Times"
                    onChange={this.onChange}
                    value={this.state.times}>
                    <option>Times</option>
                    <option>1 Time</option>
                    <option>2 Times</option>
                    <option>3 Times</option>
                    <option>4 Times</option>
                    <option>5 Times</option>
                    </select>
                    </div>

                     <div className="form-group">
                    <label htmlFor="lstatus">Status</label>
                    <select type="checkbox" className="form-control"
                    name="lstatus" defaultValue="lstatus"
                    onChange={this.onChange}
                    value={this.state.lstatus}>
                    <option>Lock/Unlock</option>
                    <option>Lock</option>
                    <option>Unlock</option>
                    </select>
                    </div>
                    
                    

                <input type="submit" value="Submit" className="btn btn-primary btn-block"
                />
                </form>
             </div>
           </div>
      </div>
    )
  }
}

AddEmployee.propTypes = {
    firestore: PropTypes.object.isRequired,
}

export default firestoreConnect()(AddEmployee);