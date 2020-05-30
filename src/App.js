import React, { useEffect } from 'react';
import Layout from './containers/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Spinner from './components/Spinner';
import Auth from './pages/auth';
import axios from 'axios';
import Orders from './pages/orders/orders';
import Products from './pages/products/products';
import ProductEdit from './pages/products/product-edit';
import ProductCreation from './pages/products/product-creation';
import OrderCreation from './pages/orders/order-creation';
import ForgotPassword from './pages/forgot-password';
import AuthContext from './context/auth-context';
import { useCookies } from 'react-cookie';
import './styles.css';
import './App.css';

const App = () => {
  const [authState, setAuthState] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const [appToken, setAppToken] = React.useState(undefined);
  const [userProfile, setUserProfile] = React.useState({
    name: '',
    email: '',
    surname: ''
  });
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  
  useEffect(() => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/token/check`, {data: { token: cookies.token } } )
      .then(response => {
        setLoading(false);
        console.log(response);
        setUserProfile(response.data.user);
        setAppToken(cookies.token);
        setAuthState(true);
      })
      .catch(err => {
        console.log(err)
        if (err) {
          setAuthState(false);
          setLoading(false);
          setAppToken(false);
        }
      });
  }, [])

  return(
    <>
    {loading ? <Spinner /> :
    <Router>
    <AuthContext.Provider value={{
      authenticated: authState,
      login: () => {
        setAuthState(true);
      },
      logout: () => {
        setAuthState(false);
        setAppToken(undefined);
        removeCookie('token')
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
        <Route path="/order/new">
          <OrderCreation />
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
        <Redirect to="/" />
      </Layout>
    </Switch>
    :
      <Switch>
        <div className="auth-container">
          <div className="auth-form">
            <Route  path="/login">
                <Auth title="Login" />
            </Route>
            <Route path="/signup">
              <Auth title="Sign Up" />
            </Route>
            <Route  path="/forgot-password">
              <ForgotPassword title="Password Recovery" />
            </Route>
            <Redirect to="/login" />
            </div>
        </div>
      </Switch>}
      </AuthContext.Consumer>
    
    </div>
    </AuthContext.Provider>
  </Router>}
  </>
  );
}

export default App;
