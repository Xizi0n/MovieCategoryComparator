import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  genres;
  selected;
  movies;

  constructor(private movieS: MovieService) { }

  ngOnInit() {
    this.movieS.getGenres().subscribe(genres => {
      this.genres = genres.genres;
      console.log('This.genres');
      console.log(this.genres);
    }, error => {
      console.log(error);
    });
  }

  selectionChanged( event ) {
    console.log(event.value);
    this.movieS.discoverCategory(this.selected.id).subscribe(movies => {
      this.movies = movies.results;
      console.log(this.movies);
    }, error => {
      console.log(error);
    });
  }

}
