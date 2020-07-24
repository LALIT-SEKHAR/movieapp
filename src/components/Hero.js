import React, { Component } from 'react';
import { GOOGLE_API_KEY, IMDB_API_KEY } from '../backend';
import Loader from './Loader';
import { Random_Movies } from './Random_movies';

class Hero extends Component  {

    constructor(){
        super()
        this.state = {
          resiveTitledData: '',
          resiveYoutubeData: '',
          title: '',
          googleapiType: 'video',
          youtubedataisrady:false,
          isloading: false,
        }
        this.handelchanhe = this.handelchanhe.bind(this)
        this.fetchTitle = this.fetchTitle.bind(this)
        this.fetchYoutube = this.fetchYoutube.bind(this)
    }

    async componentDidMount(){
        const num = Random_Movies.length;
        const title = await Math.floor(Math.random() * num);
        this.setState({title: Random_Movies[title]})
        this.fetchTitle();
      }
    
      fetchTitle(){
        this.setState({isloading:true, youtubedataisrady: false})
        fetch(`https://www.omdbapi.com/?apikey=${IMDB_API_KEY}&t=${this.state.title}`)
        .then(res => res.json())
        .then(data => this.setState({resiveTitledData: data}))
        .catch(err => console.log(err))
        this.setState({isloading:false})
      }
    
      fetchYoutube(){
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_API_KEY}&type=${this.state.googleapiType}&part=snippet&maxResults=1&q=${this.state.resiveTitledData.Title} trailer`)
      .then(resp => resp.json())
      .then(datta => this.setState({resiveYoutubeData: datta,youtubedataisrady:true}))
      .catch(erro => console.log(erro))
      }
    
      handelchanhe(e) {
        this.setState({[e.target.name]: e.target.value})
      }

    render(){
        return (
            !this.state.resiveTitledData.Response || this.state.isloading ?
          <Loader/>
          :
            !this.state.resiveTitledData.Error ? 
          <div className="App-header" >
            <div className="imgHolder" style={{backgroundImage: `url(${this.state.resiveTitledData.Poster})`}}>
                <img src={this.state.resiveTitledData.Poster} alt="Poster"/>
              <h1>{this.state.resiveTitledData.Title}</h1>
            </div>
            <div className="dataHolder">
              <div className="titleContener">
              <input className="title" placeholder="Search by Title" type="text" name="title" onChange={this.handelchanhe}/>
              <button className="titleBtn" onClick={this.fetchTitle}>Submit</button>
              </div>
              <div className="paragrap">
              { this.state.resiveTitledData.Type 
              && 
                <p><span>Trailer : </span> 
                  {!this.state.youtubedataisrady ?
                  <button onClick={this.fetchYoutube} className="trailerbtn">
                      To Watch Click Hear
                  </button> 
                  : 
                  <iframe title={this.state.resiveTitledData.Title} width="100%" height="auto" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
                    src={`https://www.youtube.com/embed/${this.state.resiveYoutubeData.items["0"].id.videoId}?autoplay=1`}>
                  </iframe>}
                </p>
              }
              { this.state.resiveTitledData.Type && <p><span>Type : </span> {this.state.resiveTitledData.Type}</p>}
              { this.state.resiveTitledData.imdbRating && <p><span>Rating : </span> <img src="icons8-christmas-star-48.png" alt="*"/> {this.state.resiveTitledData.imdbRating}</p>}
              { this.state.resiveTitledData.Genre && <p><span>Genre : </span> {this.state.resiveTitledData.Genre}</p>}
              { this.state.resiveTitledData.Released && <p><span>Released : </span> {this.state.resiveTitledData.Released}</p>}
              { this.state.resiveTitledData.Language && <p><span>Language : </span> {this.state.resiveTitledData.Language}</p>}
              { this.state.resiveTitledData.Actors && <p><span>Actors</span> : {this.state.resiveTitledData.Actors}</p>}
              { this.state.resiveTitledData.Writer && <p><span>Writer</span> : {this.state.resiveTitledData.Writer}</p>}
              { this.state.resiveTitledData.Director && <p><span>Director : </span> {this.state.resiveTitledData.Director}</p>}
              { this.state.resiveTitledData.Awards && <p><span>Awards : </span><img src="icons8-the-oscars-64.png" alt="*"/> {this.state.resiveTitledData.Awards}</p>}
              { this.state.resiveTitledData.Plot && <p><span>Plot : </span> {this.state.resiveTitledData.Plot}</p>}
              </div>
            </div>
          </div>
          :
          <div className="App-header" >
            <div className="imgHolder" style={{backgroundImage: `url(icons8-error-64.png)`}}>
                {/* <img src="icons8-error-64.png" alt="Poster"/> */}
                <h1>{this.state.resiveTitledData.Error}</h1>
            </div>
            <div className="dataHolder">
              <div className="titleContener">
              <input className="title" placeholder="Search by Title" type="text" name="title" onChange={this.handelchanhe}/>
              <button className="titleBtn" onClick={this.fetchTitle}>Submit</button>
              </div>
              <div className="paragrap">
              </div>
            </div>
          </div>
        );
    }
};

export default Hero;