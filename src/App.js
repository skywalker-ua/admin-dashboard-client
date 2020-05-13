import React from 'react';
import Layout from './containers/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Auth from './pages/auth';
import Orders from './pages/orders';
import Products from './pages/products/products';
import ProductEdit from './pages/products/product-edit';
import ProductCreation from './pages/products/product-creation';
import AuthContext from './context/auth-context';
import './styles.css';
import './App.css';

const App = () => {
  const [authState, setAuthState] = React.useState(false)
  const [userProfile, setUserProfile] = React.useState({
    name: '',
    email: '',
    surname: ''
  });
  
  return(
    <Router>
    <AuthContext.Provider value={{
      authenticated: authState,
      login: () => {
        setAuthState(true)
      },
      setUser: (user) => {
        setUserProfile({
          name: user.name,
          email: user.email,
          surname: user.surname
        })
      },
      user: userProfile
    }}>
    <Layout>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <AuthContext.Consumer>
          {context => context.authenticated ? 
          <>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="/products/new">
              <ProductCreation />
            </Route>
            <Route path="/products/:productId">
              <ProductEdit />
            </Route>
          </>
          :
          <>
            <Route path="/login">
                <Auth title="Login" />
            </Route>
            <Route path="/signup">
              <Auth title="Sign Up" />
            </Route>
          </>}
          </AuthContext.Consumer>
        </Switch>
    </Layout>
    </AuthContext.Provider>
    </Router>
  );
}

export default App;
