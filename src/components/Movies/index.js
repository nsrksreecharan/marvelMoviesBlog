import {Component} from "react";
import Cookies  from "js-cookie";
import MovieCard from "../MovieCard";
import Navigator from "../Navigator";
import "./index.css"
import ThemeContext from "../../context/ThemeContext";
import { GiLeakySkull } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";

class Movies extends Component {
    state={data:[],initialData:[],success:false,dataSet:false,filteredData:[],search:""}

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
            this.setState({initialData:Movies,filteredData:Movies,data:Movies});
        }
        else{
            this.setState({success:false});
        }
    }

    updateSearch=(event)=>{
        event.persist();
        this.setState({search:event.target.value});
    }

    SearchName=()=>{
        const {search,data,initialData}=this.state;
        const ModifiedData=initialData.filter((i)=>(i.film.toLowerCase().includes(search.toLowerCase())));
        if(search===""){
            this.setState({data:initialData})
        }
        else{
            this.setState({data:ModifiedData})
        }
    }

    filterByHero=(hero)=>{
        const {initialData}=this.state;
        let Hero="";
        switch(true){
            case (hero=="cap"):
                Hero="America";
                break;
            case (hero=="ironMan"):
                Hero="Iron";
                break;
            case (hero=="capM"):
                Hero="Marvel";
                break;
            case (hero=="hulk"):
                Hero="Hulk";
                break;
            case (hero=="thor"):
                Hero="Thor";
                break;
            case (hero=="spider"):
                Hero="Spider";
                break;
            case (hero=="strange"):
                Hero="Strange";
                break;
            case (hero=="galaxy"):
                Hero="Galaxy";
                break;
            case (hero=="widow"):
                Hero="Widow";
                break;
            case (hero=="Ant"):
                Hero="Ant";
                break;
            case (hero=="panther"):
                Hero="Panther";
                break;
            case (hero=="avengers"):
                Hero="Avengers";
                break;
            case (hero=="shi"):
                Hero="Shang";
                break;
            case (hero=="eternals"):
                Hero="Eternals";
                break;
            default:
                Hero="";
                break;
        }
        const ModifiedData=initialData.filter(i=>i.film.includes(Hero));
        this.setState({data:ModifiedData,filteredData:ModifiedData,dataSet:false});
    }

    sortByBudget=(budget)=>{
        const {filteredData,initialData}=this.state;
        let ModifiedData=filteredData===[]? initialData.slice():filteredData.slice();
        if(budget==="low"){
            ModifiedData=ModifiedData.sort((i,j)=>{
                let rupee1;
                let rupee2;
                let date1=new Date(i.date).getFullYear();
                let date2=new Date(j.date).getFullYear();
                switch(true){
                    case (date1===2008):
                        rupee1=43.15;
                        break;
                    case (date1===2009):
                        rupee1=48.41;
                        break;
                    case (date1===2010):
                        rupee1=45.73;
                        break;
                    case (date1===2011):
                        rupee1=46.67;
                        break;
                    case (date1===2012):
                        rupee1=53.44;
                        break;
                    case (date1===2013):
                        rupee1=56.57;
                        break;
                    case (date1===2014):
                        rupee1=62.33;
                        break;
                    case (date1===2015):
                        rupee1=62.97;
                        break;
                    case (date1===2016):
                        rupee1=66.46;
                        break;
                    case (date1===2017):
                        rupee1=67.79;
                        break;
                    case (date1===2018):
                        rupee1=70.09;
                        break;
                    case (date1===2019):
                        rupee1=70.39;
                        break;
                    case (date1===2020):
                        rupee1=76.38;
                        break;
                    case (date1===2021):
                        rupee1=74.57;
                        break;
                    case (date1===2022):
                        rupee1=81.35;
                        break;
                    default:
                        break;
                }
                switch(true){
                    case (date2===2008):
                        rupee2=43.15;
                        break;
                    case (date2===2009):
                        rupee2=48.41;
                        break;
                    case (date2===2010):
                        rupee2=45.73;
                        break;
                    case (date2===2011):
                        rupee2=46.67;
                        break;
                    case (date2===2012):
                        rupee2=53.44;
                        break;
                    case (date2===2013):
                        rupee2=56.57;
                        break;
                    case (date2===2014):
                        rupee2=62.33;
                        break;
                    case (date2===2015):
                        rupee2=62.97;
                        break;
                    case (date2===2016):
                        rupee2=66.46;
                        break;
                    case (date2===2017):
                        rupee2=67.79;
                        break;
                    case (date2===2018):
                        rupee2=70.09;
                        break;
                    case (date2===2019):
                        rupee2=70.39;
                        break;
                    case (date2===2020):
                        rupee2=76.38;
                        break;
                    case (date2===2021):
                        rupee2=74.57;
                        break;
                    case (date2===2022):
                        rupee2=81.35;
                        break;
                    default:
                        break;
                }
                return Math.ceil((i.budget*rupee1)/10000000)-Math.ceil((j.budget*rupee2)/10000000)
            });
            this.setState({data:ModifiedData,dataSet:false})
        }
        else if(budget==="high"){
            ModifiedData=ModifiedData.sort((i,j)=>{
                let rupee1;
                let rupee2;
                let date1=new Date(i.date).getFullYear();
                let date2=new Date(j.date).getFullYear();
                switch(true){
                    case (date1===2008):
                        rupee1=43.15;
                        break;
                    case (date1===2009):
                        rupee1=48.41;
                        break;
                    case (date1===2010):
                        rupee1=45.73;
                        break;
                    case (date1===2011):
                        rupee1=46.67;
                        break;
                    case (date1===2012):
                        rupee1=53.44;
                        break;
                    case (date1===2013):
                        rupee1=56.57;
                        break;
                    case (date1===2014):
                        rupee1=62.33;
                        break;
                    case (date1===2015):
                        rupee1=62.97;
                        break;
                    case (date1===2016):
                        rupee1=66.46;
                        break;
                    case (date1===2017):
                        rupee1=67.79;
                        break;
                    case (date1===2018):
                        rupee1=70.09;
                        break;
                    case (date1===2019):
                        rupee1=70.39;
                        break;
                    case (date1===2020):
                        rupee1=76.38;
                        break;
                    case (date1===2021):
                        rupee1=74.57;
                        break;
                    case (date1===2022):
                        rupee1=81.35;
                        break;
                    default:
                        break;
                }
                switch(true){
                    case (date2===2008):
                        rupee2=43.15;
                        break;
                    case (date2===2009):
                        rupee2=48.41;
                        break;
                    case (date2===2010):
                        rupee2=45.73;
                        break;
                    case (date2===2011):
                        rupee2=46.67;
                        break;
                    case (date2===2012):
                        rupee2=53.44;
                        break;
                    case (date2===2013):
                        rupee2=56.57;
                        break;
                    case (date2===2014):
                        rupee2=62.33;
                        break;
                    case (date2===2015):
                        rupee2=62.97;
                        break;
                    case (date2===2016):
                        rupee2=66.46;
                        break;
                    case (date2===2017):
                        rupee2=67.79;
                        break;
                    case (date2===2018):
                        rupee2=70.09;
                        break;
                    case (date2===2019):
                        rupee2=70.39;
                        break;
                    case (date2===2020):
                        rupee2=76.38;
                        break;
                    case (date2===2021):
                        rupee2=74.57;
                        break;
                    case (date2===2022):
                        rupee2=81.35;
                        break;
                    default:
                        break;
                }
                return Math.ceil((j.budget*rupee2)/10000000)-Math.ceil((i.budget*rupee1)/10000000)
            });
            this.setState({data:ModifiedData,dataSet:false})
        }
        else if(budget===""){
            this.setState({data:filteredData,dataSet:false})
        }
    }

    sortByCollection=(budget)=>{
        const {filteredData,initialData}=this.state;
        let ModifiedData=filteredData===[]?initialData.slice():filteredData.slice();
        if(budget==="low1"){
            ModifiedData=ModifiedData.sort((i,j)=>{
                let rupee1;
                let rupee2;
                let date1=new Date(i.date).getFullYear();
                let date2=new Date(j.date).getFullYear();
                switch(true){
                    case (date1===2008):
                        rupee1=43.15;
                        break;
                    case (date1===2009):
                        rupee1=48.41;
                        break;
                    case (date1===2010):
                        rupee1=45.73;
                        break;
                    case (date1===2011):
                        rupee1=46.67;
                        break;
                    case (date1===2012):
                        rupee1=53.44;
                        break;
                    case (date1===2013):
                        rupee1=56.57;
                        break;
                    case (date1===2014):
                        rupee1=62.33;
                        break;
                    case (date1===2015):
                        rupee1=62.97;
                        break;
                    case (date1===2016):
                        rupee1=66.46;
                        break;
                    case (date1===2017):
                        rupee1=67.79;
                        break;
                    case (date1===2018):
                        rupee1=70.09;
                        break;
                    case (date1===2019):
                        rupee1=70.39;
                        break;
                    case (date1===2020):
                        rupee1=76.38;
                        break;
                    case (date1===2021):
                        rupee1=74.57;
                        break;
                    case (date1===2022):
                        rupee1=81.35;
                        break;
                    default:
                        break;
                }
                switch(true){
                    case (date2===2008):
                        rupee2=43.15;
                        break;
                    case (date2===2009):
                        rupee2=48.41;
                        break;
                    case (date2===2010):
                        rupee2=45.73;
                        break;
                    case (date2===2011):
                        rupee2=46.67;
                        break;
                    case (date2===2012):
                        rupee2=53.44;
                        break;
                    case (date2===2013):
                        rupee2=56.57;
                        break;
                    case (date2===2014):
                        rupee2=62.33;
                        break;
                    case (date2===2015):
                        rupee2=62.97;
                        break;
                    case (date2===2016):
                        rupee2=66.46;
                        break;
                    case (date2===2017):
                        rupee2=67.79;
                        break;
                    case (date2===2018):
                        rupee2=70.09;
                        break;
                    case (date2===2019):
                        rupee2=70.39;
                        break;
                    case (date2===2020):
                        rupee2=76.38;
                        break;
                    case (date2===2021):
                        rupee2=74.57;
                        break;
                    case (date2===2022):
                        rupee2=81.35;
                        break;
                    default:
                        break;
                }
                return Math.ceil((i.movie_collection*rupee1)/10000000)-Math.ceil((j.movie_collection*rupee2)/10000000)
            });
            this.setState({data:ModifiedData,dataSet:false})
        }
        else if(budget==="high1"){
            ModifiedData=ModifiedData.sort((i,j)=>{
                let rupee1;
                let rupee2;
                let date1=new Date(i.date).getFullYear();
                let date2=new Date(j.date).getFullYear();
                switch(true){
                    case (date1===2008):
                        rupee1=43.15;
                        break;
                    case (date1===2009):
                        rupee1=48.41;
                        break;
                    case (date1===2010):
                        rupee1=45.73;
                        break;
                    case (date1===2011):
                        rupee1=46.67;
                        break;
                    case (date1===2012):
                        rupee1=53.44;
                        break;
                    case (date1===2013):
                        rupee1=56.57;
                        break;
                    case (date1===2014):
                        rupee1=62.33;
                        break;
                    case (date1===2015):
                        rupee1=62.97;
                        break;
                    case (date1===2016):
                        rupee1=66.46;
                        break;
                    case (date1===2017):
                        rupee1=67.79;
                        break;
                    case (date1===2018):
                        rupee1=70.09;
                        break;
                    case (date1===2019):
                        rupee1=70.39;
                        break;
                    case (date1===2020):
                        rupee1=76.38;
                        break;
                    case (date1===2021):
                        rupee1=74.57;
                        break;
                    case (date1===2022):
                        rupee1=81.35;
                        break;
                    default:
                        break;
                }
                switch(true){
                    case (date2===2008):
                        rupee2=43.15;
                        break;
                    case (date2===2009):
                        rupee2=48.41;
                        break;
                    case (date2===2010):
                        rupee2=45.73;
                        break;
                    case (date2===2011):
                        rupee2=46.67;
                        break;
                    case (date2===2012):
                        rupee2=53.44;
                        break;
                    case (date2===2013):
                        rupee2=56.57;
                        break;
                    case (date2===2014):
                        rupee2=62.33;
                        break;
                    case (date2===2015):
                        rupee2=62.97;
                        break;
                    case (date2===2016):
                        rupee2=66.46;
                        break;
                    case (date2===2017):
                        rupee2=67.79;
                        break;
                    case (date2===2018):
                        rupee2=70.09;
                        break;
                    case (date2===2019):
                        rupee2=70.39;
                        break;
                    case (date2===2020):
                        rupee2=76.38;
                        break;
                    case (date2===2021):
                        rupee2=74.57;
                        break;
                    case (date2===2022):
                        rupee2=81.35;
                        break;
                    default:
                        break;
                }
                return Math.ceil((j.movie_collection*rupee2)/10000000)-Math.ceil((i.movie_collection*rupee1)/10000000)
            });
            this.setState({data:ModifiedData,dataSet:false})
        }
        else if(budget===""){
            this.setState({data:filteredData,dataSet:false})
        }
    }

    setToDefaultData=(nav)=>{
        this.setState(i=>({data:i.initialData,dataSet:true}))
    }

    render(){
        const {data,success,dataSet,search}=this.state;
        return(
            <ThemeContext.Consumer>
            {value=>{
                const {dark,nav}=value;
                return(
                    <>
                        <div className="MoviesNavContainer">
                            <div className={`${dark?"blackMovies":""} Movies`}>
                                <div className="searchContainer">
                                    <div className="SearchBox">
                                        <input type="search" className="search" value={search} onChange={this.updateSearch}  placeholder="Search"/>
                                        <button type="button" onClick={this.SearchName} className="searchButton"><BsSearch/></button>
                                    </div>
                                </div>
                                <div className="MoviesContainer">
                                    {data.map(i=><MovieCard key={i._id} itemDetails={i}/>)}
                                </div>
                            </div>
                            {nav && data.length?
                            <div className={`${dark?"darkNavigator":"Navigator"}`}>
                               <Navigator filterByHero={this.filterByHero} sortByBudget={this.sortByBudget} sortByCollection={this.sortByCollection}/>
                            </div>
                            :
                            (dataSet?"":this.setToDefaultData())
                            }
                        </div>
                        
                    </>
                )
            }}
            </ThemeContext.Consumer>
        )
    }
}

export default Movies;