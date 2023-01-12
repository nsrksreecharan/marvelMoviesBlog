import { Component } from "react-image-crop";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";
class Navigator extends Component{
    state={mark:"",budget:"",collection:""}

    markLabel=(event)=>{
        event.persist();
        this.setState(i=>({mark:i.mark===event.target.id?"":event.target.id}),this.changeData);
    }

    changeData=()=>{
        const {filterByHero}=this.props
        filterByHero(this.state.mark);  
    }

    changeBudget=(event)=>{
        event.persist();
        console.log(event);
        this.setState(i=>({budget:i.budget===event.target.id?"":event.target.id}),this.markBudget);
    }

    changeCollection=(event)=>{
        event.persist();
        this.setState(i=>({collection:i.collection===event.target.id?"":event.target.id}),this.markCollection);
    }

    markBudget=()=>{
        const {sortByBudget}=this.props;
        const {budget}=this.state;
        console.log(budget);
        sortByBudget(budget);
    }

    markCollection=()=>{
        const {sortByCollection}=this.props;
        const {collection}=this.state;
        console.log(collection);
        sortByCollection(collection);
    }

    render(){
        const {mark,budget,collection}=this.state;
        return(
            
        <>
            <h3>All Filters</h3>
            <hr/>
            <h3>Filter by Hero</h3>
            <div className="heroesFilterContainer">
                <div className="FilterBox">
                    <input type="radio"  id="ironMan" onClick={this.markLabel} checked={mark==="ironMan"}/>
                    <label htmlFor="ironMan">Iron Man</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="cap" onClick={this.markLabel} checked={mark==="cap"}/>
                    <label htmlFor="cap">Captain America</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="thor" onClick={this.markLabel} checked={mark==="thor"}/>
                    <label htmlFor="thor">Thor</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="hulk" onClick={this.markLabel} checked={mark==="hulk"}/>
                    <label htmlFor="hulk">Hulk</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="spider" onClick={this.markLabel} checked={mark==="spider"}/>
                    <label htmlFor="spider">Spider Man</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="strange" onClick={this.markLabel} checked={mark==="strange"}/>
                    <label htmlFor="strange">Dr.Strange</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="avengers" onClick={this.markLabel} checked={mark==="avengers"}/>
                    <label htmlFor="avengers">Avengers</label>
                </div>    
                <div className="FilterBox">
                    <input type="radio"  id="panther" onClick={this.markLabel} checked={mark==="panther"}/>
                    <label htmlFor="panther">Black Panther</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="galaxy" onClick={this.markLabel} checked={mark==="galaxy"}/>
                    <label htmlFor="galaxy">Guardians</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="widow" onClick={this.markLabel} checked={mark==="widow"}/>
                    <label htmlFor="widow">Black Widow</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="Ant" onClick={this.markLabel} checked={mark==="Ant"}/>
                    <label htmlFor="Ant">Ant Man</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="capM" onClick={this.markLabel} checked={mark==="capM"}/>
                    <label htmlFor="capM">Captain Marvel</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="shi" onClick={this.markLabel} checked={mark==="shi"}/>
                    <label htmlFor="shi">Shang-shi</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="eternals" onClick={this.markLabel} checked={mark==="eternals"}/>
                    <label htmlFor="eternals">Eternals</label>
                </div>
            </div>
            
            <h3>Sort By Budget</h3>
            <div className="heroesFilterContainer">
                <div className="FilterBox">
                    <input type="radio"   id="high" onClick={this.changeBudget} checked={budget==="high"}/>
                    <label htmlFor="high">High to Low</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="low"  onClick={this.changeBudget} checked={budget==="low"}/>
                    <label htmlFor="low">Low to High</label>
                </div>
            </div>

            <h3>Sort By Collections</h3>
            <div className="heroesFilterContainer">
                <div className="FilterBox">
                    <input type="radio"  id="high1"  onClick={this.changeCollection} checked={collection==="high1"}/>
                    <label htmlFor="high1">High to Low</label>
                </div>
                <div className="FilterBox">
                    <input type="radio"  id="low1"  onClick={this.changeCollection} checked={collection==="low1"}/>
                    <label htmlFor="low1">Low to High</label>
                </div>
            </div>

        </>
        )
    }
}

export default Navigator;