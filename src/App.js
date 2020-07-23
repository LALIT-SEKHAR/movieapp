import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(){
    super()
    this.state = {
      resiveTitledData: '',
      resiveYoutubeData: '',
      title: 'friends',
      googleapiType: 'video',
      youtubedataisrady:false,
      isloading: false,
    }
    this.handelchanhe = this.handelchanhe.bind(this)
    this.fetchTitle = this.fetchTitle.bind(this)
    this.fetchYoutube = this.fetchYoutube.bind(this)
  }

  componentDidMount(){
    this.fetchTitle();
  }

  fetchTitle(){
    this.setState({isloading:true})
    fetch(`https://www.omdbapi.com/?apikey=3738a2b7&t=${this.state.title}`)
    .then(res => res.json())
    .then(data => this.setState({resiveTitledData: data}))
    .catch(err => console.log(err))
    this.setState({isloading:false})
    // console.log(this.state.resiveTitledData)
    // console.log(this.state.resiveYoutubeData.items["0"].id.videoId);
  }

  fetchYoutube(){
  fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyActvMKUIgTohsOFQvAROWEfo2Q1UAbB9s&type=${this.state.googleapiType}&part=snippet&maxResults=1&q=${this.state.resiveTitledData.Title} trailer`)
  .then(resp => resp.json())
  .then(datta => this.setState({resiveYoutubeData: datta,youtubedataisrady:true}))
  .catch(erro => console.log(erro))
  }

  handelchanhe(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      !this.state.resiveTitledData.Response || this.state.isloading ?
      <div id="mainSectionForLoader">
        <div id="loaderholder">
            <div id="loader0"></div>    
            <div id="loader1"></div>    
            <div id="loader2"></div>    
            <div id="loader3"></div>    
            <div id="loader4"></div>    
            <div id="loader5"></div>    
        </div>
      </div>
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
              <iframe title={this.state.resiveTitledData.Title} width="100%" height="auto"
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
          {/* { this.state.resiveTitledData.Type && <p><span>Type : </span> {this.state.resiveTitledData.Type}</p>}
          { this.state.resiveTitledData.imdbRating && <p><span>Rating : </span> <img src="icons8-christmas-star-48.png" alt="*"/> {this.state.resiveTitledData.imdbRating}</p>}
          { this.state.resiveTitledData.Genre && <p><span>Genre : </span> {this.state.resiveTitledData.Genre}</p>}
          { this.state.resiveTitledData.Released && <p><span>Released : </span> {this.state.resiveTitledData.Released}</p>}
          { this.state.resiveTitledData.Language && <p><span>Language : </span> {this.state.resiveTitledData.Language}</p>}
          { this.state.resiveTitledData.Actors && <p><span>Actors</span> : {this.state.resiveTitledData.Actors}</p>}
          { this.state.resiveTitledData.Writer && <p><span>Writer</span> : {this.state.resiveTitledData.Writer}</p>}
          { this.state.resiveTitledData.Director && <p><span>Director : </span> {this.state.resiveTitledData.Director}</p>}
          { this.state.resiveTitledData.Awards && <p><span>Awards : </span><img src="icons8-the-oscars-64.png" alt="*"/> {this.state.resiveTitledData.Awards}</p>}
          { this.state.resiveTitledData.Plot && <p><span>Plot : </span> {this.state.resiveTitledData.Plot}</p>} */}
          </div>
        </div>
      </div>
    );
  }
}



export default App;


//GET https://www.googleapis.com/youtube/v3/search?q=zero%20trailer&key=AIzaSyActvMKUIgTohsOFQvAROWEfo2Q1UAbB9s HTTP/1.1
//Authorization: Bearer [YOUR_ACCESS_TOKEN]
//Accept: application/json