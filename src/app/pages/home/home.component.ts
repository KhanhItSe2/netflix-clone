import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private apiService: MovieApiService) {}

  backdropResult: any = [];
  trendingMovieResult: any = [];
  // Genres Results
  actionMovieResult: any = [];
  thrillerMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];

  ngOnInit(): void {
    this.backdropData();
    this.trendingData();
    this.actionMovie();
    this.animationMovie();
    this.adventureMovie();
    this.documentaryMovie();
    this.comedyMovie();
    this.scienceFictionMovie();
    this.thrillerMovie();
  }

  backdropData() {
    this.apiService.backdropApiData().subscribe((data) => {
      this.backdropResult = data.results;
    });
  }

  trendingData() {
    this.apiService.trendingApiData().subscribe((data) => {
      this.trendingMovieResult = data.results;
    });
  }

  // Action Movie
  actionMovie() {
    this.apiService.getActionMovies().subscribe((data) => {
      console.log(data, 'action movie');
      this.actionMovieResult = data.results;
    });
  }

  // Action Movie
  animationMovie() {
    this.apiService.getAnimationMovies().subscribe((data) => {
      console.log(data, 'animation movie');
      this.animationMovieResult = data.results;
    });
  }

  // Adventure Movie
  adventureMovie() {
    this.apiService.getAdventureMovies().subscribe((data) => {
      console.log(data, 'adventure movie');
      this.adventureMovieResult = data.results;
    });
  }

  // Comedy Movie
  comedyMovie() {
    this.apiService.getComedyMovies().subscribe((data) => {
      console.log(data, 'comedy movie');
      this.comedyMovieResult = data.results;
    });
  }

  // documentary Movie
  documentaryMovie() {
    this.apiService.getDocumentaryMovies().subscribe((data) => {
      console.log(data, 'documentary movie');
      this.documentaryMovieResult = data.results;
    });
  }

  // Thriller Movie
  thrillerMovie() {
    this.apiService.getThrillerMovies().subscribe((data) => {
      console.log(data, 'thriller movie');
      this.thrillerMovieResult = data.results;
    });
  }

  // Scien-fiction Movie
  scienceFictionMovie() {
    this.apiService.getScienceFictionMovies().subscribe((data) => {
      console.log(data, 'science movie');
      this.sciencefictionMovieResult = data.results;
    });
  }
}
