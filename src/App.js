import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NoMatch from './NoMatch/NoMatch';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

export const CartContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart,setCart] = useState([]);
  
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <CartContext.Provider value={[cart,setCart]}>      
        <Router>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/review">
              <Review/>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment/>
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/inventory">
              <Inventory/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail/> 
            </Route>                  
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>        
        </Router>
      </CartContext.Provider> 
    </UserContext.Provider>
  );
}

export default App;
