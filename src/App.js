import {Switch,Route} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import './App.css';

function App() {
  return (
    
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    
  );
}

export default App;
