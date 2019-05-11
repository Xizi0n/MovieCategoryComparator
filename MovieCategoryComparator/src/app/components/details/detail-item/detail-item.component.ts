import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css']
})
export class DetailItemComponent implements OnInit {

  @Input() movie;
  color = 'accent';
  mode = 'determinate';
  score;
  movieDetails;
  gotDetails = false;
  good = false;
  average = false;
  bad = false;

  constructor(private movieS: MovieService) {}

  ngOnInit() {
    this.movieS.getMovieById(this.movie.id).subscribe( data => {
      console.log(data);
      this.movieDetails = data;
      if (this.movieDetails.vote_average < 5 ) {
        this.bad = true;
      } else {
        if (this.movieDetails.vote_average >= 5 && this.movieDetails.vote_average < 7.5 ) {
          this.average = true;
        } else {
          this.good = true;
        }
      }
      this.gotDetails = true;
    }, error => {
      console.log(error);
    });
  }

}
