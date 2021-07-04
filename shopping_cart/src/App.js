import React from "react";
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import ProductListing from "./containers/ProductListing";
import Header from "./containers/Header";
import ProductDetails from "./containers/ProductDetails";
import LoginForm from "./containers/LoginForm"
import AdminPanel from './containers/AdminPanel'
import ManageProducts from "./containers/ManageProducts";
import "./App.css";

function App() {
  return (
    <div className="App" sty>
      
      { <Router>
        <Header />
        
        <Switch>
          
          <Route path="/" exact component={LoginForm} />
          <Route path="/ProductListing"  component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />

          <Route path="/AdminPanel"  component={AdminPanel} />
          <Route path="/ManageProducts"  component={ManageProducts} />
          
          <Route>404 Not Found!</Route>
        </Switch>
      </Router> }
    </div>
  );
}

export default App;
