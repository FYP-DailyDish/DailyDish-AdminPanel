import "./App.css";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPass from './components/ForgotPass'
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./components/UpdateProfile";
import Adminusers from "./components/Adminusers";
import Appusers from "./components/Appusers";
import ChefComp from "./components/ChefComp";
import OrderComp from "./components/OrderComp";
import RiderComp from "./components/RiderComp";
import ChatAdmin from "./components/ChatAdmin";
import Disabled from './components/Disabled'
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path='/forgot-password' component={ForgotPass}/>
          <Route path='/disabled' component={Disabled}/>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <PrivateRoute exact path="/admin-users" component={Adminusers} />
          <PrivateRoute exact path="/app-users" component={Appusers} />
          <PrivateRoute exact path="/chefs" component={ChefComp} />
          <PrivateRoute exact path="/orders" component={OrderComp} />
          <PrivateRoute exact path="/riders" component={RiderComp} />
          <PrivateRoute exact path="/admin-chat" component={ChatAdmin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
