import {Component} from "react"

class Login extends Component{
    state={username:"",password:"",isError:false,errorMsg:"Username and Password Required"}

    

    getData=async()=>{
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
            const data=await response.json();
            console.log(data.jwtToken)
            const profileUrl="https://sample-project1-sigma.vercel.app/profile_image";
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${data.jwtToken}`
                }
            }
            
            const Response=await fetch(profileUrl,options);
            console.log(Response)
        }
        else{
            console.log(response);
        }
        
    }

    submitForm=(event)=>{
        event.preventDefault();
        this.setState({isError:false},this.getData)
    }

    changeUsername=(event)=>{
        this.setState({username:event.target.value});
    }

    changePassword=(event)=>{
        this.setState({password:event.target.value});
    }

    none=(event)=>{
        event.preventDefault();
        this.setState({isError:true});
    }

    render(){
    const {username,password,isError,errorMsg}=this.state
    return(
        <div >
            <form onSubmit={username===""||password===""?this.none:this.submitForm}>
            <h1>Login</h1>
            <label htmlFor="username">Username</label>
            <input id="username" value={username} onChange={this.changeUsername} placeholder="Enter Username"/>
            <label htmlFor="password">Password</label>
            <input id="password" value={password} onChange={this.changePassword} placeholder="Enter Password"/>
            <button type="submit" className="loginButton">Login</button>
            <p>{isError?errorMsg:""}</p>
            </form>

        </div>
    )
    }
}

export default Login