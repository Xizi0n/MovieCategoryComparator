import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MovieCategoryComparator';

  constructor(private movie: MovieService) {}

  ngOnInit() {
    this.movie.getGenres();

    setTimeout(() => {
      // this.movie.getGenreMovies(this.movie.genres.genres[0].id);
      this.movie.discoverCategory(12);
      this.movie.getPoster(299534);
    }, 1000);
  }
}


