import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom'; 

// import Login from './Components/Login/Login';
import { fnameUpdater, lnameUpdater, selectLname, selectFname } from './slices/userDetailsSlice';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import React, { Fragment } from 'react';


function App() {
  const userDetail = {
    fn: useSelector(selectFname),
    ln: useSelector(selectLname),
  };
  

  // console.log(userDetail.fn);
  // console.log(userDetail.ln);

  return (
    <Router>
      <React.Fragment>
        <AdminDashboard/>
      </React.Fragment>
    </Router>
  );
}

export default App;


