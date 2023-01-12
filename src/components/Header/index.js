import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from 'reactjs-popup'
import {FaMoon, FaArrowRight} from "react-icons/fa"
import {BsFillSunFill} from "react-icons/bs"
import {RiFilterFill} from "react-icons/ri"
import ThemeContext from "../../context/ThemeContext";
import "./index.css"


const colors=["yellow","green","red","blue","orange","lightBlue"]
const backgroundColorSelect=Math.floor(Math.random()*5);
class Header extends Component{
    state={isProfile:false,url:null,logout:false,username:"",nav:false}

    

    componentDidMount(){
        this.getData();
    }

    parseJwt=(token)=>{
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    

    getData=async()=>{
            const jwtToken=Cookies.get("jwtToken");
            const details=this.parseJwt(jwtToken);
            const username=details.username;
            const profileUrl="https://sample-project1-sigma.vercel.app/profile_image";
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${jwtToken}`
                }
            }
            
            const Response=await fetch(profileUrl,options);
            if(Response.ok){
            const Data=await Response.blob()
            const url=URL.createObjectURL(Data);
            this.setState({url,isProfile:true,username})
            }
            else{
                const Data=await Response.text();
                this.setState({isProfile:false,username});
            }
    }

    logoutUser=()=>{
        Cookies.remove("jwtToken");
        this.setState({logout:true});
    }

    render(){
        
        const {url,isProfile,logout,username}=this.state
        return(
            <ThemeContext.Consumer>
                {value=>{
                    const {dark,changeTheme,changeNavView,nav}=value
                    const changeThemes=()=>{
                        changeTheme();
                    }
                    const changeNavViews=()=>{
                        changeNavView();
                    }
                    return(
                        <div className={`Header ${dark?"blackBackgroundHeader":"whiteBackgroundHeader"}`}>
                            {logout? <Redirect to="/login" replace={true}/>:""}
                            
                            <div className="ProfileContainer">
                                    <div className="ProfileBoxHeader">
                                        <Popup modal trigger={isProfile?<img src={url} alt="profilePicture" className="HeaderProfilePicture"/>:<div className={`${colors[backgroundColorSelect]} NameProfile`}><p className="userLetter">{username!==""?username[0].toUpperCase():""}</p></div>}>
                                            {close=>{
                                                return(
                                                    <div className="ProfileSection">
                                                        
                                                        <button type="button" onClick={()=>close()}>Close</button>
                                                        <div className="ProfileSectionInnerBox">
                                                            <img src={url} alt="profile" className="ProfilePicture"/>
                                                            <div className="LogoutContainer">
                                                                <button type="button" onClick={this.logoutUser} className="LogoutButton">Logout</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }}
                                        </Popup>
                                    </div>
                                
                            </div>
                            <div className="LogoContainer">
                                <img src="https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503521/1672503298367_zl4lus.png" alt="logo" className="WebsiteLogo"/>
                            </div>
                            <div className="NavigationLinks">
                                <div className="HomeNav">
                                <Link to="/" style={{"textDecoration":"none","color":"inherit"}}>
                                    <p>Home</p>
                                </Link>
                                </div>
                                <div className="MoviesNav">
                                    <Link to="/movies" style={{"textDecoration":"none","color":"inherit"}}><p>Movies</p></Link>
                                </div>
                                <div className="themeContainer">
                                    <button type="button" onClick={changeThemes} className="ThemeButton">{dark?<BsFillSunFill className="sun"/>:<FaMoon className="moon"/>}</button>
                                </div>
                                {this.props.showNav?
                                            <div className="navigatorContainer">
                                                <button type="button" onClick={changeNavViews} className="NavigatorButton">{nav?<FaArrowRight/>:<RiFilterFill/>}</button>
                                            </div>
                                            :
                                            ""
                                    }
                            </div>
                        </div>
                )}}
            </ThemeContext.Consumer>
        )
    }
}

export default Header;