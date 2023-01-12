import {Outlet,  Redirect, Route} from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";

const ProtectedRoute=(props)=>{
    const jwtToken=Cookies.get("jwtToken");
    if(jwtToken===undefined){
        return <Redirect to="/login"/>
    }
    return <><Header showNav={props.showNav}/><Route {...props}/></>
}

export default ProtectedRoute;