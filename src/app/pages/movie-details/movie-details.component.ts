import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, find, map, pluck, tap } from 'rxjs';
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
        }),
        map((detail) => (this.getMovieDetailResult = detail))
      )
      .subscribe();
  }

  getMovieVideo(id: any) {
    return this.apiService
      .getMovieVideo(id)
      .pipe(
        delay(2000),
        tap((data) => {
          this.loaderService.hideLoader();
        }),
        map((video) =>
          video.results.find(
            (result: any) =>
              result.type === 'Trailer' || result.type == 'Teaser'
          )
        )
      )
      .subscribe((video) => {
        this.getMovieVideoResult = video.key;
      });
  }

  getMovieCast(id: any) {
    return this.apiService
      .getMovieCast(id)
      .pipe(
        delay(2000),
        tap((data) => {
          this.loaderService.hideLoader();
        }),
        map((cast) => (this.getMovieCastResult = cast.cast))
      )
      .subscribe();
  }
}
