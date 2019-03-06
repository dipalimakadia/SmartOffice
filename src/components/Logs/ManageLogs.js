import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';


 class ManageLogs extends Component {
    


  render() {
      const { logs } = this.props;
  
      if (logs){
         return (
             <div>
                 <div className="row">
                   <div className="col-md-6">
                       <h2>
                         {' '}
                          <i className="fas fa-users"/> LogsDetail {' '}
                       </h2>
                   </div>


                    <table className="table table-striped">
                     <thead className="thead-inverse">
                         <tr>
                             <th>Name</th>
                             <th>Age</th>
                         </tr>
                     </thead>
                     <tbody>
                     {logs.map(logs =>(
                            <tr key={logs.id}>
                              <td>{logs.firstName} {logs.lastName}</td>
                              <td>{logs.Age}</td>
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

ManageLogs.propTypes = {
    firestore: PropTypes.object.isRequired,
    logs: PropTypes.array
}

export default compose(
    firestoreConnect([{
        collection: 'logs' }]),
        connect((state, props) => ({
            logs: state.firestore.ordered.logs
        }))

)(ManageLogs);