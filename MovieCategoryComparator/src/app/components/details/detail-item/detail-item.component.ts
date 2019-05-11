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
  outerStrokeColor;
  innerStrokeColor;

  constructor(private movieS: MovieService) {}

  ngOnInit() {
    this.movieS.getMovieById(this.movie.id).subscribe( data => {
      console.log(data);
      this.movieDetails = data;
      if (this.movieDetails.vote_average < 5 ) {
        this.bad = true;
        this.outerStrokeColor = '#FF605C';
        this.innerStrokeColor = '#FC8A88';
      } else {
        if (this.movieDetails.vote_average >= 5 && this.movieDetails.vote_average < 7.5 ) {
          this.average = true;
          this.outerStrokeColor = '#FFBB45';
          this.innerStrokeColor = '#FFCE7A';
        } else {
          this.good = true;
          this.outerStrokeColor = '#00C74C';
          this.innerStrokeColor = '#56C47E';
        }
      }
      this.gotDetails = true;
    }, error => {
      console.log(error);
    });
  }

}

/* .good {
  color: #00C74C;
}

.average {
  color: #FFBB45;
}

.bad {
  color: #FF605C;
} */
