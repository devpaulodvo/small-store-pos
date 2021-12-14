import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Axios from "axios";
import ProductList from './Components/Product/ViewProducts/ProductList';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import React, { useEffect }  from 'react';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import { useSelector, useDispatch} from 'react-redux'
import { authUpdater, selectAuth } from "./slices/userDetailsSlice";


function App() {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect( async () => {
    const token = localStorage.getItem("token");
    if(token !== null){
      let result = await Axios.get("http://localhost:3001/isUserAuth", 
      {headers: {"x-access-token": localStorage.getItem("token")}});
      console.log(result)
      dispatch(authUpdater(result.data))
    }
    
  },[])

  return (
      <Router>
        <Switch>
          <React.Fragment>
              <Route path={["/login"]} component={Login}/>
              <Route exact path={["/register"]} component={Register}/>
              <Route exact path={["/", "/store"]} component={ProductList}/>
              <ProtectedRoute path={["/dashboard"]} pathname={'/login'} component={AdminDashboard} isAuth={isAuth}/>
          </React.Fragment>
        </Switch>
      </Router>
  );
 }

export default App;


