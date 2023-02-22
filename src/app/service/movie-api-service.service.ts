import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://api.themoviedb.org/3';
  apikey = '94857fee6bf57933f91c3f19867d90a8';

  // backdropapidata
  backdropApi = `${this.baseUrl}/trending/all/week?api_key=${this.apikey}`;

  backdropApiData(): Observable<any> {
    return this.http.get(this.backdropApi);
  }

  // trendingapidata
  trendingApi = `${this.baseUrl}/trending/movie/day?api_key=${this.apikey}`;

  trendingApiData(): Observable<any> {
    return this.http.get(this.trendingApi);
  }

  // search

  getSearchMovie(data: any): Observable<any> {
    console.log(data);
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`
    );
  }
}
