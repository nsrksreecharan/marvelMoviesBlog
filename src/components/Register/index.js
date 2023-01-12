import {Component,createRef} from "react"
import ReactCrop from 'react-image-crop'
import {Buffer} from "buffer"
import {Navigate,Link, Redirect} from 'react-router-dom'
import 'react-image-crop/dist/ReactCrop.css'
import 'reactjs-popup/dist/index.css'
import "./index.css"
import {ImCrop} from "react-icons/im";
import {AiOutlineUserAdd,AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri";
import { TailSpin } from "react-loader-spinner"
import ThemeContext from "../../context/ThemeContext"



class Register extends Component{
    state={
        username:"",
        password:"",
        reenter:"",
        file:null,
        success:false,
        src:null,
        fileError:false,
        showPassword:false,
        showEenter:false,
        fileErrorMsg:"",
        crop:{
            aspect:1/1,
        },
        showCrop:false,
        changedCrop:false,
        isLoading:false,
        showError:false,
        ErrorMsg:""
    }

    imagePreviewCanvas=createRef();

    submitData=async(event)=>{
        event.preventDefault();
        this.setState({isLoading:true})
        const RegisterUrl="https://sample-project1-sigma.vercel.app/register";
        const {file,password,username}=this.state;
        const formData=new FormData();
        formData.append("profile_image",file);
        formData.append("username",username);
        formData.append("password",password);
        const options={
            method:"POST",
            body:formData
        }
        const Response=await fetch(RegisterUrl,options)
        if(Response.ok){
            const Data=await Response.text()
            this.setState({success:true})
        }
        else{
            const Data=await Response.text()
            this.setState({success:false,username:"",password:"",reenter:"",showError:true,ErrorMsg:Data,isLoading:false});
        }
    }

    dontSubmit=(event)=>{
        event.preventDefault();
        const {username,password,reenter}=this.state;
        if(username==="" && password!=="" && reenter!==""){
            this.setState({showError:true,ErrorMsg:"Username Required"})
        }
        else if(username!=="" && password==="" && reenter!==""){
            this.setState({showError:true,ErrorMsg:"Password Required"})
        }
        else if(username!=="" && password!=="" && reenter===""){
            this.setState({showError:true,ErrorMsg:"Reenter Required"})
        }
        else{
            this.setState({showError:true,ErrorMsg:"Can't Register With Empty Fields"})
        }
    }

    onChangeUsername=(event)=>{
        this.setState({username:event.target.value,showError:false});
    }

    onChangePassword=(event)=>{
        this.setState({password:event.target.value,showError:false});
    }

    onChangeReenter=(event)=>{
        this.setState({reenter:event.target.value,showError:false});
    }

    selectFile=(event)=>{
        const file=event.target.files[0];
        if(file.type==="image/jpeg"||file.type==="image/jpg"||file.type==="image/png"){
        this.setState({file});
        const reader=new FileReader();
        reader.addEventListener("load",()=>
        this.setState({src:reader.result}));
        reader.readAsDataURL(file);
        }
        else{
            this.setState({fileError:true,fileErrorMsg:`Your Select is Not An Image`});
        }
    }

    extractImageFileExtensionFromBase64=(base64Data)=>{
        return base64Data.substring("data:image/",base64Data.length,base64Data.indexOf(";base64"))
    }

    selectCroppedFile=(file)=>{
        if(file.type==="image/jpeg"||file.type==="image/jpg"||file.type==="image/png"){
            this.setState({file,showCrop:false});
            const reader=new FileReader();
            reader.addEventListener("load",()=>
            this.setState({src:reader.result,crop:{
                aspect:1/1,
            },changedCrop:false,}));
            reader.readAsDataURL(file);
            }
            else{
                this.setState({fileError:true,fileErrorMsg:`Your Select is Not An Image`});
            }
    }

    image64toCanvasRef=(canvasRef,image64,pixelCrop)=>{
        const canvas=canvasRef;
        canvas.width=pixelCrop.width;
        canvas.height=pixelCrop.height;
        const ctx=canvas.getContext("2d");
        const image=new Image();
        image.src=image64;
        image.onload=()=>{
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            )
        }
        return image;
    }

    
    onCropChange = crop=>{
        this.setState({crop,changedCrop:true});
       
    }

    onCropComplete=(Crop,pixelCrop)=>{
        const {src,crop}=this.state;
        
        const canvasRef=this.imagePreviewCanvas.current;
        this.image64toCanvasRef(canvasRef,src,Crop)
        
    }

   
    toggleCrop=()=>{
        this.setState(i=>({showCrop:!i.showCrop}));
    }

    loadCropImage=()=>{
        const {changedCrop}=this.state;
        if(changedCrop){
        const canvas=this.imagePreviewCanvas.current;
        const Url=canvas.toDataURL("image/jpeg");
        const buffer=Buffer.from(Url.replace('data:image/jpeg;base64,',''),"base64");
        const file=new File([buffer],"image.jpg",{type:"image/jpeg"});
        this.selectCroppedFile(file);
        }
        else{
            this.setState({showCrop:false});
        }
    }

    fileInput=createRef();

    render(){
        const {
            username,
            password,
            isLoading,
            reenter,
            success,
            file,
            changedCrop,
            showCrop,
            src,
            fileError,
            fileErrorMsg,
            showPassword,
            showEenter,
            crop,
            showError,
            ErrorMsg
        }=this.state
        return(
            <ThemeContext.Consumer>
            {value=>{
                const {dark}=value;
                return(
                    <div className={`${dark?"blackBackground":"whiteBackground"} RegisterPage`}>
                        <div className={`${dark?"blackLogin":"whiteLogin"} RegisterPageBox`}>
                            <div className="imageLogoContainer">
                                <img src={dark?"https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503510/1672503437356_lmbm5i.png":"https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503516/1672503379370_hr9p4z.png"} alt="logo" className="LoginLogo"/>
                            </div>
                        {success? <Redirect to='/login' replace={true} />:""}
                        {!showCrop?
                            <form className="RegisterForm" onSubmit={username===""||password===""||reenter===""||password!==reenter?this.dontSubmit:this.submitData}>                            
                                <div className="FormItemsContainer">
                                <div className="RegistrantProfileBox">
                                    <input type="file" ref={this.fileInput} onChange={this.selectFile} className="fileInput"/>
                                    {!src?
                                    <button type="button" className={`${dark?"blackProfile":""} ProfileAdd`} onClick={(event)=>{event.preventDefault();this.fileInput.current.click()}}>
                                        <AiOutlineUserAdd  className="Face1"/>
                                    </button>
                                        :
                                    ""
                                    }
                                    {src?
                                        <div className="ProfilePictureContainer">
                                            <img src={src} alt="selected Item" className="profileImageRegister"/>
                                            <div className="editButtonsContainer">
                                                <button type="button" className={`${dark?"darkCrop":"whiteCrop"} CropButton`} onClick={this.toggleCrop}><ImCrop/></button>   
                                                <button onClick={()=>this.setState({file:null,src:null})} className={`${dark?"darkCrop":"whiteCrop"} CropButton`}><RiDeleteBin6Line/></button>
                                                <button onClick={(event)=>{event.preventDefault();this.fileInput.current.click()}} class="changeButton">Change</button>
                                            </div>
                                        </div>
                                        :
                                        <p>{fileError?`${fileErrorMsg}`:""}</p>
                                    }
                                </div>
                                <div className="InputBoxesContainer">
                                    <div className="inputBox">
                                        <label htmlFor="username" className={`${dark?"white":""} label`}>Username</label>
                                        <input autoComplete="off" value={username} id="username" className={`${dark?"darkInput":""} input`} type="text" placeholder="Enter Username" onChange={this.onChangeUsername}/>
                                    </div>
                                    <div className="inputBox">
                                        <label htmlFor="password"  className={`${dark?"white":""} label`}>Password</label>
                                        <div  className={`${dark?"darkInput":""} input InputBox`} >
                                            <input autoComplete="off"  value={password}  id="password" className={`${dark?"darkInput":""} Input`}  type={showPassword?"text":"password"} placeholder="Enter Password" onChange={this.onChangePassword}/>
                                            {password.length!==0?<button type="button" onClick={()=>{this.setState(i=>({showPassword:!i.showPassword}))}} className="Eye">{showPassword?<AiFillEyeInvisible/>:<AiFillEye/>}</button>:""}
                                        </div>    
                                    </div>
                                    <div className="inputBox">
                                    <label htmlFor="reenter" className={`${dark?"white":""} label`}>Confirm Password</label>
                                    <div  className={`${dark?"darkInput":""} input InputBox`} >
                                        <input autoComplete="off"  value={reenter} id="reenter" className={`${dark?"darkInput":""} Input`}  type={showEenter?"text":"password"} placeholder="Confirm Password" onChange={this.onChangeReenter}/>
                                        {reenter.length!==0?<button type="button" onClick={()=>{this.setState(i=>({showEenter:!i.showEenter}))}} className="Eye">{showEenter?<AiFillEyeInvisible/>:<AiFillEye/>}</button>:""}
                                    </div>
                                    
                                    </div>
                                </div>
                                </div>
                                <button type="submit" className="loginButton">{isLoading?<TailSpin wrapperClass="tailLoader" color="white" radius={1} height={30}/>:"Register Me"}</button>
                                {showError?<p className="error">*{ErrorMsg}</p>:""}
                                <div className="RegisterLinkBox">
                                    <Link to="/login" style={{"textDecoration":"none","color":"inherit"}}>
                                        <p className="RegisterPageLink">Already Registered! SignIn</p>
                                    </Link>
                                </div>
                            </form>
                            :
                            <div className="cropBox">
                                <div className="CropContainer">
                                    <div className="cropPreview">
                                        <canvas ref={this.imagePreviewCanvas} id="canvas" className="PreviewImage"></canvas>
                                    </div>
                                    <div>
                                    <ReactCrop  
                                        crop={crop} 
                                        minHeight={50}
                                        minWidth={50}
                                        onChange={this.onCropChange} 
                                        onComplete={this.onCropComplete}
                                        className="cropTheImage"
                                    >
                                        <img src={src} className="ImagePreviewCrop"/>
                                    </ReactCrop>
                                    </div>
                                </div>
                                <button type="button" className="loginButton" onClick={this.loadCropImage}>Done</button>
                                <button type="button" className="loginButton" onClick={()=>{this.setState({showCrop:false})}}>Cancel</button>
                            </div>
                        }
                    </div>
                </div>
           
                )
            }
        }
        </ThemeContext.Consumer>
        )
    }
}

export default Register