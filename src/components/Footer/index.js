import {AiOutlineCopyright} from "react-icons/ai"
import ThemeContext from "../../context/ThemeContext"
import "./index.css"

const Footer=()=>{
    return(
        <ThemeContext.Consumer>
        {value=>{
            const {dark}=value
            return(
        <div className={`${dark?"darkFooter":""} Footer`}>
            <div className="CopyRight">
                <AiOutlineCopyright/><p>N S R K Sree Charan</p>
            </div>
        </div>)
        }}
        </ThemeContext.Consumer>

    )
}

export default Footer