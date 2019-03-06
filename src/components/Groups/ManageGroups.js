import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

 class ManageGroups extends Component {

  render() {
      const {techgroup, marketgroup, managmentgroup, financegroup} = this.props;
     
  
     if (techgroup && marketgroup && managmentgroup && financegroup){
        return (
            <div>
                <div className="card">
                 <div className="row">
                  <div className="col-md-8">
                      <h2>
                        {' '}
                         <i className="fas fa-users"/> Technical Group{' '}
                      </h2>
                  </div> 

        

                  </div>            
                   <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
 
                        {techgroup.map(techgroup =>(
                           <tr key={techgroup.id}>
                             <td>{techgroup.firstName} {techgroup.lastName}</td>
                             <td>{techgroup.email}</td>
                             <td>{techgroup.phone}</td>
                             <td>{techgroup.position}</td>
                           </tr>
                        ))}
                    </tbody>
                   </table>
                </div>


                <br/>
                <div className="card">
                 <div className="row">
                  <div className="col-md-10">
                      <h2>
                        {' '}
                         <i className="fas fa-users"/> Marketing Group{' '}
                      </h2>
                  </div> 

                  </div>            
                   <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
 
                        {marketgroup.map(marketgroup =>(
                           <tr key={marketgroup.id}>
                             <td>{marketgroup.firstName} {marketgroup.lastName}</td>
                             <td>{marketgroup.email}</td>
                             <td>{marketgroup.phone}</td>
                             <td>{marketgroup.position}</td>
                           </tr>
                        ))}
                    </tbody>
                   </table>
                </div>

                 <br/>
                <div className="card">
                 <div className="row">
                  <div className="col-md-10">
                      <h2>
                        {' '}
                         <i className="fas fa-users"/> Managment Group{' '}
                      </h2>
                  </div> 

                  </div>            
                   <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
 
                        {managmentgroup.map(managmentgroup =>(
                           <tr key={managmentgroup.id}>
                             <td>{managmentgroup.firstName} {managmentgroup.lastName}</td>
                             <td>{managmentgroup.email}</td>
                             <td>{managmentgroup.phone}</td>
                             <td>{managmentgroup.position}</td>
                           </tr>
                        ))}
                    </tbody>
                   </table>
                </div>

                 <br/>
                <div className="card">
                 <div className="row">
                  <div className="col-md-10">
                      <h2>
                        {' '}
                         <i className="fas fa-users"/> Finance Group{' '}
                      </h2>
                  </div> 

                  </div>            
                   <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
 
                        {financegroup.map(financegroup =>(
                           <tr key={financegroup.id}>
                             <td>{financegroup.firstName} {financegroup.lastName}</td>
                             <td>{financegroup.email}</td>
                             <td>{financegroup.phone}</td>
                             <td>{financegroup.position}</td>
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
ManageGroups.propTypes = {
    firestore: PropTypes.object.isRequired,
    techgroup: PropTypes.array,
    marketgroup: PropTypes.array,
    managmentgroup: PropTypes.array,
    financegroup: PropTypes.array
    
}

export default compose(

    firestoreConnect([{ collection:  'employees', where: ['group', '==', 'Technical Group'], storeAs: 'techgroup'},
     {collection: 'employees', where: ['group', '==', 'Marketing Group'], storeAs: 'marketgroup'},
      { collection:  'employees', where: ['group', '==', 'Managment Group'], storeAs: 'managmentgroup'},
       { collection:  'employees', where: ['group', '==', 'Finance Group'], storeAs: 'financegroup'}]),

    connect((state, props) => ({
        techgroup: state.firestore.ordered.techgroup,
        marketgroup: state.firestore.ordered.marketgroup,
        managmentgroup: state.firestore.ordered.managmentgroup,
        financegroup: state.firestore.ordered.financegroup
    }))
)(ManageGroups);