import React from 'react';
import Sidebar from '../layout/Sidebar';
import Employees from '../employees/Employees';
import ReactPlayer from 'react-player';



export default  ()  => {
  return (
    <div className="row">
      <div className="col-md-10">
         <Employees/>
         <ReactPlayer url='https://www.youtube.com/watch?v=yYpIZ4n-cFI' playing />

          <video  width="500" autoplay></video>
         
         
      </div>

      <div className="col-md-2">
         <Sidebar/>
      </div>



    </div>
  )
}
