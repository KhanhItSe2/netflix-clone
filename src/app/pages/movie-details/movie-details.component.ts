import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, tap } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';
import { MovieApiService } from 'src/app/service/movie-api-service.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  showLoader$ = this.loaderService.loadingAction$;
  constructor(
    private apiService: MovieApiService,
    private router: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  getMovieDetailResult: any = [];
  getMovieVideoResult: any = [];
  getMovieCastResult: any = [];

  ngOnInit(): void {
    this.loaderService.showLoader();

    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovieDetails(getParamId);
    this.getMovieVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  getMovieDetails(id: any) {
    return this.apiService
      .getMovieDetails(id)
      .pipe(
        delay(2000),
        tap((data) => {
          this.loaderService.hideLoader();
        })
      )
      .subscribe((detail) => {
        this.getMovieDetailResult = detail;
      });
  }

  getMovieVideo(id: any) {
    return this.apiService
      .getMovieVideo(id)
      .pipe(
        delay(2000),
        tap((data) => {
          this.loaderService.hideLoader();
        })
      )
      .subscribe((video) => {
        console.log(video, 'video');
        video.results.forEach((result: any) => {
          if (result.type === 'Trailer' || result.type === 'Teaser') {
            this.getMovieVideoResult = result.key;
          }
        });
      });
  }

  getMovieCast(id: any) {
    return this.apiService
      .getMovieCast(id)
      .pipe(
        delay(2000),
        tap((data) => {
          this.loaderService.hideLoader();
        })
      )
      .subscribe((cast) => {
        console.log(cast, 'cast');
        this.getMovieCastResult = cast.cast;
      });
  }
}
