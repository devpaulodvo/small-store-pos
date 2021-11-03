import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

// import Login from './Components/Login/Login';
import { fnameUpdater, lnameUpdater, selectLname, selectFname } from './slices/userDetailsSlice';
import ProductList from './Components/Product/ViewProducts/ProductList';
import Login from './Components/Login/Login';
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
      <Switch>
      <React.Fragment>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path={["/register"]}>
          <ProductList/>
        </Route>
        <Route exact path={["/", "/baligya"]}>
          <ProductList/>
        </Route>
      </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;


