import {Component} from "react"
import {MagnifyingGlass, ThreeDots} from "react-loader-spinner"
import {BsFillPersonFill} from "react-icons/bs"
import {Link,Redirect} from "react-router-dom"
import Cookies from "js-cookie";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import "./index.css"
import ThemeContext from "../../context/ThemeContext"

const colors=["yellow","green","red","blue","orange","lightBlue"]
const backgroundColorSelect=Math.floor(Math.random()*5);
class Login extends Component{
    state={
        url:"",
        username:"",
        backgroundColor:colors[backgroundColorSelect],
        noProfileImage:false,
        password:"",
        isError:false,
        isLoading:false,
        isLoadingLogin:false,
        success:false,
        fullSuccess:false,
        logged:false,
        showPassword:false,
        errorMsg:"Username and Password Required"
    }

    

    getData=async()=>{
        this.setState({isLoadingLogin:true})
        const loginUrl="https://sample-project1-sigma.vercel.app/login";
        const {username,password}=this.state;
        const userDetails={
            username,
            password
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userDetails),
        }
        
        const response=await fetch(loginUrl,options);
        if(response.ok===true){
            this.setState({isLoading:true,isLoadingLogin:false,logged:true})
            const data=await response.json();
            const jwtToken=data.jwtToken;
            console.log(jwtToken);
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
            this.setState({url,isLoading:false,success:true})
            }
            else{
                const Data=await Response.text();
                this.setState({noProfileImage:true,isLoading:false,src:"",success:true});
            }
            Cookies.set("jwtToken",jwtToken,{expires:30});
            setTimeout(()=>this.setState({fullSuccess:true}),2000);
        }
        else{
            const Data=await response.text()
            this.setState({isError:true,errorMsg:Data,isLoading:false,isLoadingLogin:false})
        }
        
    }

    submitForm=(event)=>{
        event.preventDefault();
        this.setState({isError:false,isLoading:true},this.getData)
    }

    changeUsername=(event)=>{
        this.setState({username:event.target.value,isError:false});
    }

    changePassword=(event)=>{
        this.setState({password:event.target.value,isError:false});
    }

    none=(event)=>{
        event.preventDefault();
        this.setState({isError:true});
    }

    render(){
    const {
        username,
        password,
        backgroundColor,
        isError,
        errorMsg,
        url,
        isLoading,
        isLoadingLogin,
        success,
        fullSuccess,
        showPassword,
        logged,
        noProfileImage
    }=this.state
    
    return(
        <>
        {fullSuccess? <Redirect to='/' replace={true} />:""}
        <ThemeContext.Consumer>
        {value=>{
        const {dark}=value;
        return(
        <div className={`${dark?"blackBackground":"whiteBackground"} LoginPage`}>
            <div className={`${dark?"blackLogin":"whiteLogin"} LoginPageBox`}>
                <div className="imageLogoContainer">
                    <img src={dark?"https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503510/1672503437356_lmbm5i.png":"https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503516/1672503379370_hr9p4z.png"} alt="logo" className="LoginLogo"/>
                </div>
                <form onSubmit={username===""||password==="" && logged?this.none:this.submitForm} className="RegisterForm">
                
                <div className="FormItemsContainer">
                    
                    {   
                        url==="" 
                            ?
                            <div className="ProfilePictureContainerLogin">
                                <div className={`${dark?"blackProfile":"whiteProfile"} ${username!==""?`${backgroundColor} NoProfileBox`:"NormalProfile"}`}>
                        {
                            url==="" && !isLoading ?
                            username!==""?<h1 className="white">{username[0].toUpperCase()}</h1>:<BsFillPersonFill className="Face"/>
                            :
                            <MagnifyingGlass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="MagnifyingGlass-loading"
                                wrapperStyle={{}}
                                wrapperClass="MagnifyingGlass-wrapper"
                                glassColor = '#c0efff'
                                color = '#008cff'
                                />
                        }
                                </div>
                                {noProfileImage?<p>No Profile Picture!</p>:""}
                            </div>
                            :
                            <img src={url} alt="userProfileImage" className="profilePictureLogin"/>
                            
                    }
                    
                    
                    <div className="InputBoxesContainer">
                    <div className="inputBox">
                        <label htmlFor="username" className={`${dark?"white":""} label`}>Username</label>
                        <input id="username" autoComplete="off" className={`${dark?"darkInput":""} input`} value={username} onChange={this.changeUsername} placeholder="Enter Username"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password"  className={`${dark?"white":""} label`}>Password</label>
                        <div  className={`${dark?"darkInput":""} input InputBox`} >
                                            <input autoComplete="off"  value={password}  id="password" className={`${dark?"darkInput":""} Input`}  type={showPassword?"text":"password"} placeholder="Enter Password" onChange={this.changePassword}/>
                                            {password.length!==0?<button type="button" onClick={()=>{this.setState(i=>({showPassword:!i.showPassword}))}} className="Eye">{showPassword?<AiFillEyeInvisible/>:<AiFillEye/>}</button>:""}
                        </div>  
                    </div>
                     </div>
                </div>
                <button type="submit" className="loginButton">{isLoadingLogin?
                <ThreeDots   
                    height = "50"
                    width = "50"
                    radius = "3"
                    color = 'white'
                    ariaLabel = 'three-dots-loading'     
                    wrapperStyle
                    wrapperClass="DotLoader"
                    />
                :"Login"}</button>
                {isError?<p className="error">*{errorMsg}</p>:""}
                <div className="RegisterLinkBox">
                    <Link to="/register" style={{"textDecoration":"none","color":"inherit"}}>
                        <p className="RegisterPageLink">New to here Register Now!</p>
                    </Link>
                </div>
                </form>
            </div>
        </div>
        )}}
        </ThemeContext.Consumer>
        </>
    )
    }
}

export default Login