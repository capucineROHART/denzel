import React, {Component} from 'react';
import Movies from './Components/Movies';

export default class SpecificMovie extends Component {
    state = {
         movies: []
        }
     
    componentDidMount() {
        const {id} = this.props.match.params
        fetch(`http://localhost:9292/movies/${id}`)
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