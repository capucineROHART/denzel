import React, {Component} from 'react';
import Movies from './Components/Movies';

export default class SearchMovie extends Component {
    state = {
         movies: []
       }
     
    componentDidMount() { 
       const values = this.props.location.search      
       fetch(`http://localhost:9292/movies/search${values}`)
       .then(res => res.json())
       .then((data) => {
           this.setState({ movies: data })
        }).catch(console.log)
    }
 
    render() {
        return (
        <Movies movies={this.state.movies} />);
    }
}