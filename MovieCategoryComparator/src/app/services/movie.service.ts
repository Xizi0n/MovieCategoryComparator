import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  genres;
  selectedCategory;
  allmovies = [];

  constructor(private http: HttpClient) { }

  // Get category names and ids
  getGenres(): Observable<any> {
    return this.http.get(environment.baseUrl + 'genre/movie/list?api_key=' + environment.apiKey
      + '&language=' + environment.language);
  }

  getGenreMovies(query) {
    this.http.get(environment.baseUrl + 'search/movie?api_key=' + environment.apiKey
      + '&language=' + environment.language + '&query=' + query).subscribe(movies => {
        console.log('getGenreMovies: ');
        console.log(movies);
        this.genres = movies;
      }, err => {
        console.log(err);
      });
  }
  // Get movies from given category
  discoverCategory(categoryId): Observable<any> {
    return this.http.get(environment.baseUrl + 'discover/movie?api_key=' + environment.apiKey
      + '&with_genres=' + categoryId);
  }

  getPoster(movieId) {
    this.http.get(environment.baseUrl + 'movie/' + movieId + '/images?&api_key=' + environment.apiKey).subscribe(poster => {
      console.log(poster);
    }, err => {
      console.log(err);
    });
  }


  getMoviesFromAllCategorys(): Promise<any> {
    let i = 0;
    // tslint:disable-next-line:prefer-const
    let results = [];
    return new Promise((resolve, reject) => {
      if (this.genres !== undefined && this.genres !== null) {
        this.genres.genres.forEach(element => {
          this.discoverCategory(element.id).subscribe(movies => {
            results.push(movies.results);
            if (results.length === 19) {
              resolve(results);
            }
          }, err => {
            console.log(err);
            reject(err);
          });
          i++;
        });
      } else {
        console.log('no genre :(');
      }
    });
  }

  getMovieById(id) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + environment.apiKey + '&language=en-US');
  }


}
