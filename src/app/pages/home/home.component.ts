import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: MovieApiService) {}

  backdropResult : any = []
  trendingMovieResult: any = []

  ngOnInit(): void {
    this.backdropData()
    this.trendingData()
  }

  backdropData() {
    this.apiService.backdropApiData().subscribe((data) => {
      this.backdropResult = data.results;
    })
  }

  trendingData() {
    this.apiService.trendingApiData().subscribe((data) => {
      this.trendingMovieResult = data.results
    })
  }

}
