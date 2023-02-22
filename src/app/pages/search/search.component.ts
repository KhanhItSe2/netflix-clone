import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiService } from 'src/app/service/movie-api-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private apiService: MovieApiService) {}
  ngOnInit(): void {}

  searchResult: any = [];
  searchForm = new FormGroup({
    movieName: new FormControl(),
  });

  submitForm() {
    this.apiService
      .getSearchMovie(this.searchForm.value)
      .subscribe((result) => {
        console.log(result);
        this.searchResult = result.results;
      });
  }
}
