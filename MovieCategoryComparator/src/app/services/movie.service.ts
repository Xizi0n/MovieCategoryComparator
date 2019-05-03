import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  genres;

  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get(environment.baseUrl + 'genre/movie/list?api_key=' + environment.apiKey
     + '&language=' + environment.language );
  }

  getGenreMovies(query) {
    this.http.get(environment.baseUrl + 'search/movie?api_key=' + environment.apiKey
    + '&language=' + environment.language + '&query=' + query).subscribe( movies => {
      console.log(movies);
      this.genres = movies;
    }, err => {
      console.log(err);
    });
  }

  discoverCategory(categoryId) {
    this.http.get(environment.baseUrl + 'discover/movie?api_key=' + environment.apiKey
    + '&with_genres=' + categoryId ).subscribe( movies => {
      console.log(movies);
    }, err => {
      console.log(err);
    });
  }

  getPoster(movieId) {
    this.http.get(environment.baseUrl + 'movie/' + movieId + '/images?&api_key=' + environment.apiKey).subscribe( poster => {
      console.log(poster);
    }, err => {
      console.log(err);
    });
  }


}
