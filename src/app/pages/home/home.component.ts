import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, forkJoin, tap } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';
import { MovieApiService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apiService: MovieApiService,
    private loaderService: LoaderService
  ) {}

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
  genersResults: any = [];
  ngOnInit(): void {
    this.loaderService.showLoader();
    // this.backdropData();
    // this.trendingData();
    // this.actionMovie();
    // this.animationMovie();
    // this.adventureMovie();
    // this.documentaryMovie();
    // this.comedyMovie();
    // this.scienceFictionMovie();
    // this.thrillerMovie();
    this.allData();
  }
  allData() {

    forkJoin(
      [
        this.apiService.backdropApiData(),
        this.apiService.trendingApiData(),
        this.apiService.getActionMovies(),
        this.apiService.getAnimationMovies(),
        this.apiService.getAdventureMovies(),
        this.apiService.getComedyMovies(),
        this.apiService.getDocumentaryMovies(),
        this.apiService.getThrillerMovies(),
        this.apiService.getScienceFictionMovies(),
      ],
      ( backdrop,
        trending,
        actionMovies,
        animationMovies,
        adventureMovies,
        comedyMovies,
        documentaryMovies,
        thrillerMovies,
        scienceMovies
      ) => {
        return {
          backdrop: backdrop,
          trending: trending,
          action: actionMovies,
          animation: animationMovies,
          adventure: adventureMovies,
          comedy: comedyMovies,
          documentaryMovies: documentaryMovies,
          thriller: thrillerMovies,
          science: scienceMovies,
        };
      }
    )
      .pipe(
        delay(2000),
        tap((data) => {
          this.loaderService.hideLoader();
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.backdropResult = data.backdrop.results;
        this.trendingMovieResult = data.trending.results;
        this.animationMovieResult = data.animation.results;
        this.actionMovieResult = data.action.results;
        this.adventureMovieResult = data.adventure.results;
        this.comedyMovieResult = data.comedy.results;
        this.documentaryMovieResult = data.documentaryMovies.results;
        this.thrillerMovieResult = data.thriller.results;
        this.sciencefictionMovieResult = data.science.results;
      });
  }

  // backdropData() {
  //   this.apiService.backdropApiData().subscribe((data) => {
  //     this.backdropResult = data.results;
  //   });
  // }

  // trendingData() {
  //   this.apiService.trendingApiData().subscribe((data) => {
  //     this.trendingMovieResult = data.results;
  //   });
  // }

  // // Action Movie
  // actionMovie() {
  //   this.apiService.getActionMovies().subscribe((data) => {
  //     this.actionMovieResult = data.results;
  //   });
  // }

  // // Action Movie
  // animationMovie() {
  //   this.apiService.getAnimationMovies().subscribe((data) => {
  //     // this.animationMovieResult = data.results;
  //   });
  // }

  // // Adventure Movie
  // adventureMovie() {
  //   this.apiService.getAdventureMovies().subscribe((data) => {
  //     this.adventureMovieResult = data.results;
  //   });
  // }

  // // Comedy Movie
  // comedyMovie() {
  //   this.apiService.getComedyMovies().subscribe((data) => {
  //     this.comedyMovieResult = data.results;
  //   });
  // }

  // // documentary Movie
  // documentaryMovie() {
  //   this.apiService.getDocumentaryMovies().subscribe((data) => {
  //     this.documentaryMovieResult = data.results;
  //   });
  // }

  // // Thriller Movie
  // thrillerMovie() {
  //   this.apiService.getThrillerMovies().subscribe((data) => {
  //     this.thrillerMovieResult = data.results;
  //   });
  // }

  // // Scien-fiction Movie
  // scienceFictionMovie() {
  //   this.apiService.getScienceFictionMovies().subscribe((data) => {
  //     this.sciencefictionMovieResult = data.results;
  //   });
  // }
}
