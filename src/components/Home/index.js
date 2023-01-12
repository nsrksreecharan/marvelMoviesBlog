import {Component} from "react";
import ThemeContext from "../../context/ThemeContext";
import Cookies from "js-cookie";
import Header from "../Header";
import Slider from 'react-slick'
import MovieItem from "../MovieItem";

import "./index.css"
import Footer from "../Footer";


import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


class Home extends Component{
    state={success:true,data:[]}

    componentDidMount(){
        this.getData();
    }

    getData=async()=>{
        const jwtToken=Cookies.get("jwtToken");
        const MoviesUrl="https://sample-project1-sigma.vercel.app/movies"
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${jwtToken}`,
            }
        }
        const Response=await fetch(MoviesUrl,options);
        if(Response.ok){
            let Movies=await Response.json();
            Movies=Movies.sort((m1,m2)=>(m1.likes<m2.likes)?1:(m1.likes>m2.likes)?-1:0);
            this.setState({data:Movies});
        }
        else{
            this.setState({success:false});
        }
    }

    render(){
        const {data}=this.state;
        const settings = {
            dots: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            scroll:true
          }
        return(
            <ThemeContext.Consumer>
                {value=>{
                    const {dark}=value;
                    return(
                        <>
                            <div className={`${dark?"blackHome":""} Home`}>
                                <div className="Banner">
                                    <div className="Banner1">
                                        <h1 className="BannerTitle">Welcome,Here you can Know About Different Marvel Movies.Also,You can Add Like Comment to your Favorite Marvel Movie</h1>
                                    </div>
                                </div>
                                <div className={`${dark?"blackSlick":""} SlickContainer`}>
                                    <div className="SlickHeader">
                                        <h1>Most Liked Movies</h1>
                                        <button className="moviesButton">Movies</button>
                                    </div>
                                        <div className="ReactSlickContainer">
                                            <Slider {...settings} className="slider">
                                                {data.map(i=>(<MovieItem key={i._id} itemDetails={i}/>))}
                                            </Slider>
                                        </div>
                                </div>
                            </div>
                            <Footer/>
                        </>
                    )
                }}
            </ThemeContext.Consumer>
        )
    }
}

export default Home;