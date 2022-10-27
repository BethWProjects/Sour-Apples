import React, { Component } from 'react'
import './SingleMovie.css'
import { showSingleMovie } from '../APIcalls';

class SingleMovie extends Component {
  constructor() {
    super()
    this.state = {
      singleMovie: null,
      error: ''
    }
  }

  componentDidMount() {
    const id = this.props.id
    showSingleMovie(id)
     .then(data => this.setState({singleMovie: data.movie}))
     .catch(error => this.setState({error: error}))
  }


  render() {
    const singleMovie = this.state.singleMovie
  
    const divideMovieGenres = (singleMovie) => {
      if (singleMovie.genres.length > 0) {
        return singleMovie.genres
        .slice(0, singleMovie.genres.length)
        .join(", ")
      } else {
        return "Unknown Genre"
      }
    }
    return (
      this.state.error && <h3>Oops, that was a bad apple, please try again!</h3> ||
      this.state.singleMovie && <div>
        <div className="single-movie-container" >
          <img className="backdrop" src={singleMovie.backdrop_path} alt="movie background"/>
          <article className="article-details">
            <img className="poster hidden" src={singleMovie.poster_path} alt="movie poster with title and details for show times"/>
            <div className="movie-details">
              <h1>{singleMovie.title}</h1>
              <h2 className="tagline">{`${singleMovie.tagline}`}</h2>
              <p className="details">{`${divideMovieGenres(singleMovie)}`}</p>
              <div className="minor-details">
                {this.state.singleMovie && <p className="details">{`🍏 Sour Apples Rating:  ${parseInt(singleMovie.average_rating)} / 10 `}</p>}
                <p className='divider hidden'>&nbsp;&nbsp; | &nbsp; &nbsp;</p>
                <p className="details">{`Release date:  ${singleMovie.release_date}`}</p>
                <p className='divider hidden'>&nbsp;&nbsp; | &nbsp; &nbsp;</p>
                <p className="details">{`Runtime: ${singleMovie.runtime} minutes`}</p>
              </div>
              <p className="details">{`${singleMovie.overview}`} </p>
            </div>
          </article>
          </div>
        </div> 
        
            
        
         )
}
}



export default SingleMovie;
