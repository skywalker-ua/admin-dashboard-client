import React, { useEffect } from 'react';
import Layout from './containers/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Auth from './pages/auth';
import axios from 'axios';
import Orders from './pages/orders';
import Products from './pages/products/products';
import ProductEdit from './pages/products/product-edit';
import ProductCreation from './pages/products/product-creation';
import AuthContext from './context/auth-context';
import { useCookies } from 'react-cookie';
import './styles.css';
import './App.css';

const App = () => {
  const [authState, setAuthState] = React.useState(false)
  const [appToken, setAppToken] = React.useState(undefined);
  const [userProfile, setUserProfile] = React.useState({
    name: '',
    email: '',
    surname: ''
  });
  const [cookies, setCookie] = useCookies(['token']);
  
  useEffect(() => {
    axios.post('http://localhost:5000/token/check', {data: { token: cookies.token } } )
      .then(response => {
        console.log(response);
        setAppToken(cookies.token);
        setAuthState(true);
      })
      .catch(err => {
        console.log(err)
        if (err) {
          setAuthState(false);
          setAppToken(false);
        }
      });
  }, [])

  return(
    <Router>
    <AuthContext.Provider value={{
      authenticated: authState,
      login: () => {
        setAuthState(true);
      },
      logout: () => {
        setAuthState(false);
        setAppToken(undefined);
      },
      setToken: (token) => {
        setAppToken(token);
      },
      setUser: (user) => {
        setUserProfile({
          name: user.name,
          email: user.email,
          surname: user.surname
        })
      },
      user: userProfile,
      token: appToken
    }}>
    
    <div className="app-container">
    
    <AuthContext.Consumer>
          {context => context.authenticated ? 
    <Switch>
      <Layout>
        <Route exact path="/">
          Home
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/product/new">
          <ProductCreation />
        </Route>
        <Route path="/products/:productId">
          <ProductEdit />
        </Route> 
        
      </Layout>
    </Switch>
    :
      <Switch>
        <div className="auth-container">
          <div className="auth-form">
            <Route path="/login">
                <Auth title="Login" />
            </Route>
            <Route path="/signup">
              <Auth title="Sign Up" />
            </Route>
            </div>
        </div>
      </Switch>}
      </AuthContext.Consumer>
    
    </div>
    </AuthContext.Provider>
  </Router>
  );
}

export default App;
