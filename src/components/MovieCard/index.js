import {AiFillStar,AiFillLike} from "react-icons/ai";
import Popup from 'reactjs-popup';
import {GiMoneyStack} from "react-icons/gi";
import {HiOutlineCurrencyRupee} from "react-icons/hi";
import {Link} from "react-router-dom";
import ReactPlayer from 'react-player/youtube'

import 'reactjs-popup/dist/index.css'
import "./index.css"
import ThemeContext from "../../context/ThemeContext";

const MovieCard=props=>{
    const {itemDetails}=props;
    const {poster,film,likes,rating,budget,movie_collection,date}=itemDetails;
    const year=new Date(date).getFullYear()
    let rupee;
    switch(true){
        case (year===2008):
            rupee=43.15;
            break;
        case (year===2009):
            rupee=48.41;
            break;
        case (year===2010):
            rupee=45.73;
            break;
        case (year===2011):
            rupee=46.67;
            break;
        case (year===2012):
            rupee=53.44;
            break;
        case (year===2013):
            rupee=56.57;
            break;
        case (year===2014):
            rupee=62.33;
            break;
        case (year===2015):
            rupee=62.97;
            break;
        case (year===2016):
            rupee=66.46;
            break;
        case (year===2017):
            rupee=67.79;
            break;
        case (year===2018):
            rupee=70.09;
            break;
        case (year===2019):
            rupee=70.39;
            break;
        case (year===2020):
            rupee=76.38;
            break;
        case (year===2021):
            rupee=74.57;
            break;
        case (year===2022):
            rupee=81.35;
            break;
        default:
            break;
    }
    const spend=Math.ceil((budget*rupee)/10000000);
    const profit=Math.ceil((movie_collection*rupee)/10000000);
    return(
        <ThemeContext.Consumer>
            {value=>{
                const {dark}=value;
                return(
                    <Link to={`/movies/:${film}`} style={{"color":"inherit","textDecoration":"none"}}>
                    <div className={`${dark?"blackMovieCardContainer":""} MovieCardContainer`}>
                        <p className="CardName">{film}</p>
                        <img src={poster} alt="poster" className="poster"/>
                        <div className="bottomLineCard">
                            <div className="BottomBox">
                                <p className="BudgetName">Budget</p>
                                <p className="Amount"><GiMoneyStack className="cash"/>{spend}Crs</p>
                            </div>
                            <div className="BottomBox">
                                <p className="year">{year}</p>
                            </div>
                            <div className="BottomBox">
                                <p className="BudgetName">Collection</p>
                            <p className="Amount"><HiOutlineCurrencyRupee className="rupee"/> {profit}Crs</p>
                            </div>
                        </div>
                    </div>
                </Link>
                )
            }}
        </ThemeContext.Consumer>
    )
}
export default MovieCard