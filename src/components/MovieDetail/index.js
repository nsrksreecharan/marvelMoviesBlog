import { Component } from "react";
import {withRouter} from "react-router";
import ReactPlayer from 'react-player/lazy';
import Cookies from "js-cookie";
import "./index.css"
import { TailSpin } from "react-loader-spinner";
class MovieDetail extends Component{
    state={data:{},success:true,isLoading:true};

    componentDidMount(){
        this.getData();
    }


    getData=async()=>{
        const {match}=this.props;
        const {params}=match;
        const {film}=params;
        const jwtToken=Cookies.get("jwtToken");
        const MovieDetailsUrl=`https://sample-project1-sigma.vercel.app/movies/${film.replace(":","")}`
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${jwtToken}`,
            }
        }
        const Response=await fetch(MovieDetailsUrl,options);
        if(Response.ok){
            let Movies=await Response.json();
            const ModifiedMovie={ 
                "about":Movies.about,
                "budget":Movies.budget,
                "cast":Movies.cast,
                "comments":Movies.comments,
                "date":Movies.date,
                "directors":Movies.directors,
                "film":Movies.film,
                "likes":Movies.likes,
                "likedUsers":Movies.liked_users,
                "movieCollection":Movies.movie_collection,
                "phase":Movies.phase,
                "plot":Movies.plot,
                "poster":Movies.poster,
                "producers":Movies.producers,
                "rating":Movies.rating,
                "screenwriters":Movies.screenwriters,
                "trailerUrl":Movies.trailer_url,
            };
            console.log(ModifiedMovie)
            this.setState({data:ModifiedMovie,success:true,isLoading:false});
        }
        else{
            this.setState({success:false,isLoading:false});
        }
    }

    renderSuccessView=()=>{
        const {data}=this.state;
        const { 
                about,
                budget,
                cast,
                comments,
                date,
                directors,
                film,
                likes,
                likedUsers,
                movieCollection,
                phase,
                plot,
                poster,
                producers,
                rating,
                screenwriters,
                trailerUrl
            }=data;
            console.log(directors);
        return(  
        <div className="MovieDetailsContainer">   
        <div className="PosterAndTrailerContainer">
            <div className="PosterContainer">
                <img src={poster} className="filmPoster"/>
            </div>
            <div className="ReactPlayerContianer">
                <ReactPlayer url={trailerUrl}
                allowfullscreen={true}
                light = {true}
                height="400px"
                width="700px"
                playing
                config={{
                    youtube: {
                        playerVars: { modestbranding: 1 },
                             }
                }}
                preview={true}
                    controls={true}/>
            </div>
        </div>
        <div className="FilmTitleAndLikeDisLikeContainer">
            <div className="filmTitleContainer">
            <h1>{film}</h1>
            </div>
            <div className="LikeDislikeContainer">
                <div className="likeContainer">
                    <button type="button" className="likeButton">
                        Like
                    </button>
                </div>
                <div className="likeContainer">
                    <button type="button" className="likeButton">
                        Comments
                    </button>
                </div>
            </div>
        </div>
        <hr className="HrLine"/>
        <h2 className="castHeading">Movie Cast</h2>
        <div className="CastContainer">
            <div className="castBox">
                <h3>Actors</h3>
                <hr/>
                {cast.map((i)=>(<p>{i}</p>))}
            </div>
            <div className="castBox">
                <h3>Director</h3>
                <hr/>
                {directors}
                <br/>
                <br/>
                <br/>
                <h3>{producers.length===1?"Producer":"Producers"}</h3>
                <hr/>
                {producers.map((i)=>(<p>{i}</p>))}
            </div>
            <div className="castBox">
            <h3>{screenwriters.length===1?"Screen Writer":"Screen Writers"}</h3>
                <hr/>
                {screenwriters.map((i)=><p>{i}</p>)}
            </div>
        </div>
        <div className="plotHeaderContainer">
            <h3>About</h3>
            <hr/>
        </div>
        <div className="plotContainer">
            {about.map(i=>(<p className="plot">{i}</p>))}
        </div>
        <div className="plotHeaderContainer">
            <h3>Plot</h3>
            <hr/>
        </div>
        <div className="plotContainer">
            {plot.map(i=>(<p className="plot">{i}</p>))}
        </div>
    </div>
    )
    }

    renderFailureView=()=>{
        return(
            <div className="MovieDetailsContainer">
                <h1>Failure</h1>
            </div>
        )
    }

    renderMovieDetails=()=>{
        const {success}=this.state;
        return success?this.renderSuccessView():this.renderFailureView();
    }

    renderLoader=()=>{
        return(
            <div className="MovieDetailsContainer">
                <TailSpin/>
            </div>
        )
    }

    render(){
        const {isLoading}=this.state;
        return isLoading?this.renderLoader():this.renderMovieDetails();
    }
}

export default withRouter(MovieDetail)