import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/service/movie-api-service.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private apiService: MovieApiService,
    private router: ActivatedRoute
  ) {}

  getMovieDetailResult: any = [];
  getMovieVideoResult: any = [];
  getMovieCastResult: any = [];

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovieDetails(getParamId);
    this.getMovieVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  getMovieDetails(id: any) {
    return this.apiService.getMovieDetails(id).subscribe((detail) => {
      this.getMovieDetailResult = detail;
    });
  }

  getMovieVideo(id: any) {
    return this.apiService.getMovieVideo(id).subscribe((video) => {
      console.log(video, 'video');
      video.results.forEach((result: any)=> {
        if(result.type ==='Trailer' || result.type ==='Teaser') {
          this.getMovieVideoResult = result.key
        }
      })
    });
  }

  getMovieCast(id: any) {
    return this.apiService.getMovieCast(id).subscribe((cast) => {
      console.log(cast, 'cast');
      this.getMovieCastResult = cast.cast;
    });
  }
}
