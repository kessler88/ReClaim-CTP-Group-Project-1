import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
  
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import PostFormPage from './pages/PostFormPage';
import LogInFormPage from './pages/LogInFormPage';
import SignUpPage from './pages/SignUpPage';
import MarketPlacePage from './pages/MarketPlacePage'

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                {/* <Route path="/posts/:id" component={ShowPostPage} /> */}
                <Route path="/log-in" component={LogInFormPage}/>
                <Route path="/sign-up" component={SignUpPage} />
                <Route path="/market-place" component={MarketPlacePage} />
                <Route path="/" component={LandingPage} />
              </Switch>
            </div>
          </div>
      </Router>
    );
  }
}


export default App;
