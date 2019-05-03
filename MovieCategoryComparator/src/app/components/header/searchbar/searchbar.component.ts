import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent implements OnInit {

  categories;
  selectedCategory;

  constructor( public movieService: MovieService ) {
    this.movieService.getGenres().subscribe( movies => {
      console.log(movies);
      this.categories = movies;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  select(index) {
    this.selectedCategory = this.categories.genres[index];
    this.movieService.selectedCategory = this.categories.genres[index];
    console.log('selected: ' + this.selectedCategory);
    console.log(this.selectedCategory);
    this.movieService.discoverCategory(this.selectedCategory.id);
  }

}
