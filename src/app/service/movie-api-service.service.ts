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
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`
    );
  }

  // detail movie
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${data}?api_key=${this.apikey}`
    );
  }

  // movie video
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${data}/videos?api_key=${this.apikey}`
    );
  }

  // movie Cast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${data}/credits?api_key=${this.apikey}`
    );
  }

  // genres
  // action: 28
  getActionMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=28`
    );
  }
  // adventure: 12
  getAdventureMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=12`
    );
  }
  // animation: 16
  getAnimationMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=16`
    );
  }
  // comedy: 35
  getComedyMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=35`
    );
  }
  // documentary: 99
  getDocumentaryMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=99`
    );
  }
  // science-ficton:878

  getScienceFictionMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=878`
    );
  }
  //thriller: 53

  getThrillerMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apikey}&with_genres=53`
    );
  }
}
