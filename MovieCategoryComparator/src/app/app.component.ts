import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MovieCategoryComparator';

  constructor(private movie: MovieService) {
    this.movie.getGenres().subscribe( genres => {
      this.movie.genres = genres;
      console.log(this.movie.genres);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      // this.movie.getGenreMovies(this.movie.genres.genres[0].id);
    }, 1000);
  }
}


