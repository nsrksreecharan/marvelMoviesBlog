import {Component} from "react";
import {Route,Switch} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register";
import Home from "./components/Home"
import Header from "./components/Header"
import ThemeContext from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";

class  App extends Component {
  state={dark:true,nav:false}

  changeTheme=()=>{
    this.setState(i=>({dark:!i.dark}));
  }

  
  changeNavView=()=>{
    this.setState(i=>({nav:!i.nav}));
  }


  render() {
    const {dark,nav}=this.state;
    return(
    <ThemeContext.Provider value={{nav,changeNavView:this.changeNavView,dark,changeTheme:this.changeTheme}}>

      <Switch>
        <Route  path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}/>
        <ProtectedRoute exact path="/" component={Home}/>
        <ProtectedRoute showNav={true} exact path="/movies" component={Movies}/>
        <ProtectedRoute exact path="/movies/:film" component={MovieDetail}/>
      </Switch>
      </ThemeContext.Provider>
  )}
}

export default App;
