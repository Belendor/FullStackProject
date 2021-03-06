import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"


const  Exercise = (props) =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.describtion}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={ ()=> {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)


export default class ExercisesList extends Component{

    constructor(props){
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)
        this.state = {
            exercises : []
        }
    }

    componentDidMount(){
        axios.get("https://belendor.herokuapp.com/exercises/").then(response =>{
            this.setState({
            exercises : response.data
            })
        }
        ).catch(err => console.log(err)
        )
    }

    deleteExercise(id){
        console.log("delete initiated key: ", id);
        
        axios.delete("https://belendor.herokuapp.com/exercises/" + id).then(res=> console.log(res.data)
        )
        this.setState(
            {
                exercises: this.state.exercises.filter(el => el._id !== id)
            }
        )
    }
    exerciseList(){
        console.log(this.state.exercises);
        
        return this.state.exercises.map(currentEx => {    
            return <Exercise exercise={currentEx} deleteExercise={this.deleteExercise}/>
        })
    }

    render(){
        return (
            <div>
               <h3>Logged Exercise</h3>
               <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Describtion</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
               </table>
            </div>
        )
    }
}

