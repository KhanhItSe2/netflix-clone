import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiServiceService) {}

  backdropResult : any = []
  trendingMovieResult: any = []

  ngOnInit(): void {
    this.backdropData()
    this.trendingData()
  }

  backdropData() {
    this.service.backdropApiData().subscribe((data) => {

      this.backdropResult = data.results;
    })
  }

  trendingData() {
    this.service.trendingApiData().subscribe((data) => {
      console.log(data)
      this.trendingMovieResult = data.results
    })
  }

}
