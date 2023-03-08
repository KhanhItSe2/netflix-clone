import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, Subject, switchMap, timer } from 'rxjs';
import { MovieApiService } from 'src/app/service/movie-api-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private apiService: MovieApiService, private fb: FormBuilder) {}
  ngOnInit(): void {}

  searchResult: any = [];
  // searchForm = new FormGroup({
  //   movieName: new FormControl(),
  // });
  searchForm = this.fb.group({
    movieName: '',
  });

  submitForm() {
    timer(500)
      .pipe(
        switchMap(() =>
          this.apiService.getSearchMovie(this.searchForm.value).pipe(
            map((results) => {
              console.log(results);
              this.searchResult = results.results;
            })
          )
        )
      )
      .subscribe();
  }
}
