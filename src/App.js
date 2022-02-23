import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Customers from "./Components/Customers/Customers";
import OperationsTeam from "./Components/OperationsTeam/OperationsTeam";
import Loads from "./Components/Loads/Loads";
import Invoices from "./Components/Invoices/Invoices";
import CustomerReps from "./Components/CustomerReps/CustomerReps";
import Carriers from "./Components/Carriers/Carriers";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <div>
            <Sidebar />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/customers" component={Customers} />
            <Route path="/operations-reps" component={OperationsTeam} />
            <Route path="/loads" component={Loads} />
            <Route path="/invoices" component={Invoices} />
            <Route path="/customer-reps" component={CustomerReps} />
            <Route path="/carriers" component={Carriers} />
          </div>
        </Switch>
      </Router>

      <ToastContainer style={{ textAlign: "left" }} />
    </div>
  );
}

export default App;
