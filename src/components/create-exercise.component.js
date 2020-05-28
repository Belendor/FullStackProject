import React, {Component} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

export default class CreateExercise extends Component{
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescribtion = this.onChangeDescribtion.bind(this)
        this.onChangeduration = this.onChangeduration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        this.state = {
            username :"",
            describtion : "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
       axios.get("https://belendor.herokuapp.com/users").then(response => {
           if(response.data.length > 0){
            this.setState({
                username: response.data[0].username,
                users: response.data.map(user => {
                    return user.username
                })
            })
           }
       })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescribtion(e){
        this.setState({
            describtion: e.target.value
        })
    }
    onChangeduration(e){
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault()

        const exercise = {
            username: this.state.username,
            describtion: this.state.describtion,
            duration: this.state.duration,
            date: this.state.date
        }
        
        console.log(exercise)

        axios.post("https://belendor.herokuapp.com/exercises/add", exercise).then(x => console.log(x.data))
    }

    render(){
        return (
            <div>
                <h3>Create new Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user)=>{
                                    return <option key={user} value={user}> {user} </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Describtion: </label>
                            <input type="text" required className="form-control" value={this.state.describtion} onChange={this.onChangeDescribtion} />
                    </div>
                    <div className="form-group">
                        <label> Duration (in minutes): </label>
                            <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeduration} />
                    </div>
                    <div className="form-group">
                        <label> Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}