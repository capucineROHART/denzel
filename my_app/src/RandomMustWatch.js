import React, {Component} from 'react';
import Movies from './Components/Movies';

export default class RandomMustWatch extends Component {
    state = {
         movies: []
        }
 
    componentDidMount() {
        fetch("http://localhost:9292/movies")
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
