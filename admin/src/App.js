import React from 'react';
import Layout from './containers/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Auth from './pages/auth';
import Orders from './pages/orders';
import Products from './pages/products';
import './styles.css';
import './App.css';

const App = () => {
  return(
    <Router>
    <Layout>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/login">
            <Auth title="Login" />
          </Route>
          <Route path="/signup">
            <Auth title="Sign Up" />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
        </Switch>
    </Layout>
    </Router>
  );
}

export default App;
