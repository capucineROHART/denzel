import React, {Component} from 'react';
var today = new Date();
var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export default class SaveReview extends Component  {
    constructor(){
        super();
            this.state={ date:currDate, review:"" }
        }
    handleDateChange = event =>{
        this.setState({ date:event.target.value })
    }
     handleReviewChange = event =>{
        this.setState({ review:event.target.value })
    }
    handleSubmit = event =>{
        event.preventDefault();
        const {id} = this.props.match.params
        const data = { date:this.state.date, review:this.state.review }
        fetch(`http://localhost:9292/movies/${id}`, { 
        method: "POST", // or ‘PUT’
        redirect:"manual",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{ "Content-Type": "application/json" } })
        .then(response => {window.location.href = `http://localhost:3000/movies/${id}`})
        .catch(error => console.error("Error:", error));
    }   
    render(){
        return(
        <form onSubmit={this.handleSubmit}>
        <div class="form-group">
            <label for="review">Review</label>
            <input type="text" class="form-control" id="review" placeholder="Enter your review" name="review" value={this.state.review} onChange={this.handleReviewChange} />
        </div>
        <button type="submit" value="Submit" class="btn btn-primary">Submit</button>
        </form> )
}
}