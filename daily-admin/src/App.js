import "./App.css";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import UpdateProfile from './components/UpdateProfile'
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path='/update-profile' component={UpdateProfile}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
