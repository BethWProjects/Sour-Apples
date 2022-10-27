import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { fetchData } from "../APIcalls";
import home from "../images/home.png";
import './App.css';
import apple from "../images/apple.png";
import movieapple from "../images/movie-apple1.svg";
import Movies from '../Movies/Movies';
import SingleMovie from '../SingleMovie/SingleMovie';
import Search from '../Search/Search';


class App extends Component {
    constructor() {
      super()
      this.state = {
        movies: [],
        error: '',
        loading: false,
        searchMovie: ''
      }
    }

    componentDidMount() {
      this.setState({loading: true})
      fetchData().then(data => this.setState({
        loading: false,
        movies: data.movies
      }))
      .catch(error => this.setState({error: error}))
    }

    searchForMovie = (input) => {
      this.setState({ searchMovie: input })
    }

    clearInputs = () => {
      this.setState({ searchMovie: '' })
      fetchData()
    }

    render() {
      return (
        <div>
          <nav>
            <img className="movie-apple hidden" src={movieapple} alt="apple with movie icon inside" />
            <h1 className="nav-title">Sour Apples</h1>
            <NavLink to='/'><img role="button" className="home-icon" src={home}
            alt="Home icon to take user back to main view" onClick={() => this.clearInputs()}/></NavLink>
          </nav>
          <main className="App">   
            <Route exact path='/' render={() =>  ( 
              <div>
                <Search searchForMovie={this.searchForMovie} />
                <Movies movies={this.state.movies} searchMovie={this.state.searchMovie}/>  
              </div> )}
              />
            <Route exact path='/:id' render={({ match }) => (
             <div>
                <SingleMovie id={match.params.id} /> 
              </div> )} 
            />
          {this.state.loading && <p className="apple-loader-text"> Loading your sour apples...</p>}
          {this.state.loading && <img src={apple} className="apple-loader" alt="apple loader" />}
          {this.state.error && <h3>Oops, that was a bad apple, please try again!</h3> }
          </main>
          <footer>
            <h3 className="footer-text"> 🍏 Created by Beth and Marianne </h3>
          </footer>
        </div>
      )
    }
}

export default App;
