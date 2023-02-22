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

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getDetailMovie(getParamId);
  }

  getDetailMovie(id: any) {
    return this.apiService.getMovieDetails(id).subscribe((detail) => {
      this.getMovieDetailResult = detail;
    });
  }
}
