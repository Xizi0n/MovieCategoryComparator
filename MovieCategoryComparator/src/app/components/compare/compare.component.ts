import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Chart } from 'chart.js';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  genres;
  selectedFirst: any;
  selectedSecond: any;
  firstChildData: any;
  secondChildData: any;
  firstStatisticData: any;
  secondStatisticData: any;
  selection = 'vote_average';
  options = [{
    display: 'Average Votes',
    id: 'vote_average'
  },
  {
    display: 'Average Vote Count',
    id: 'vote_count'
  },
  {
    display: 'Average Popularity',
    id: 'popularity'
  }];

  @ViewChild('myChart') private chartRef;
  chart: any;

  firstMovies = [];
  secondMovies = [];
  constructor(private movieS: MovieService) {}

  ngOnInit() {
    this.movieS.getGenres().subscribe(genres => {
      this.genres = genres.genres;
      console.log('This.genres');
      console.log(this.genres);
      this.createChart();
    }, error => {
      console.log(error);
    });
  }

  firstSelectionsChanged(event) {
    this.movieS.discoverCategory(this.selectedFirst.id).subscribe(movies => {
      this.firstMovies = movies.results;
      console.log(this.firstMovies);
      this.addDataToChart();
    }, error => {
      console.log(error);
    });

  }

  secondSelectionsChanged(event) {
    console.log(event);
    console.log(this.selectedSecond);
    this.movieS.discoverCategory(this.selectedSecond.id).subscribe(movies => {
      this.secondMovies = movies.results;
      console.log(this.secondMovies);
      this.addDataToChart();
    }, error => {
      console.log(error);
    });
  }

  createChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      responsive: true,
      maintainAspectRatio: false,
      type: 'bar',
      data: {
        datasets: [

        ],
        labels: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
    });
  }

  addDataToChart() {

    if (Object.keys(this.selectedFirst).length !== 0 && Object.keys(this.selectedSecond).length !== 0) {
      const firstData = this.getAverage(this.firstMovies, this.selection);
      const secondData = this.getAverage(this.secondMovies, this.selection);
      console.log('fist');
      console.log(firstData);
      console.log('second');
      console.log(secondData);
      this.chart.data.datasets = [];
      this.chart.data.datasets.push({
        label: this.selectedFirst.name,
        data: [{
          x: 'Avg',
          y: firstData
        }],
        backgroundColor: '#003797'
      });
      this.chart.data.datasets.push({
        label: this.selectedSecond.name,
        data: [{
          x: 'Avg',
          y: secondData
        }],
        backgroundColor: '#1F9824'
      });
      this.prepareDataForChilds();
      this.prepareStatisticData();
      this.chart.update();
    }

  }

  filterChanged(event) {
    this.addDataToChart();
  }

  getAverage(movies, filter) {
    let count = 0;
    let sum = 0;
    let avarage = 0;
    movies.forEach(element => {
      sum += element[filter];
      count += 1;
    });
    avarage = sum / count;
    return avarage;
  }


  getMinPopularity(movies) {
    let min = movies[0];
    movies.forEach(element => {
      if (element.popularity < min.popularity) {
        min = element;
      }
    });
    return min;
  }

  getMaxPopularity(movies) {
    let max = movies[0];
    movies.forEach(element => {
      if (element.popularity > max.popularity) {
        max = element;
      }
    });
    return max;
  }

  getMinVoteCount(movies) {
    let min = movies[0];
    movies.forEach(element => {
      if (element.vote_count < min.vote_count) {
        min = element;
      }
    });
    return min;
  }

  getMaxVoteCount(movies) {
    let max = movies[0];
    movies.forEach(element => {
      if (element.vote_count > max.vote_count) {
        max = element;
      }
    });
    return max;
  }

  getMinVoteAverage(movies) {
    let min = movies[0];
    movies.forEach(element => {
      if (element.vote_average < min.vote_average) {
        min = element;
      }
    });
    console.log('min');
    console.log(min);
    return min;
  }

  getMaxVoteAverage(movies) {
    let max = movies[0];
    movies.forEach(element => {
      if (element.vote_average > max.vote_average) {
        max = element;
      }
    });
    return max;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  prepareDataForChilds() {
    const firstlabels = [];
    const firstdata = [];
    const secondlabels = [];
    const seconddata = [];
    this.firstMovies.forEach( movie => {
      firstlabels.push(movie.title);
      firstdata.push(movie[this.selection]);
    });
    this.secondMovies.forEach( movie => {
      secondlabels.push(movie.title);
      seconddata.push(movie[this.selection]);
    });
    this.firstChildData = {
      labels: firstlabels,
      data: firstdata
    };
    this.secondChildData = {
      labels: secondlabels,
      data: seconddata
    };
    console.log(this.firstChildData);
    console.log(this.secondChildData);
  }

  prepareStatisticData() {
    this.firstStatisticData = {
      minPopularity: this.getMinPopularity(this.firstMovies),
      maxPopularity: this.getMaxPopularity(this.firstMovies),
      minVoteAverage: this.getMinVoteAverage(this.firstMovies),
      maxVoteAverage: this.getMaxVoteAverage(this.firstMovies),
      minVoteCount: this.getMinVoteCount(this.firstMovies),
      maxVoteCount: this.getMaxVoteCount(this.firstMovies)
    };
    this.secondStatisticData = {
      minPopularity: this.getMinPopularity(this.secondMovies),
      maxPopularity: this.getMaxPopularity(this.secondMovies),
      minVoteAverage: this.getMinVoteAverage(this.secondMovies),
      maxVoteAverage: this.getMaxVoteAverage(this.secondMovies),
      minVoteCount: this.getMinVoteCount(this.secondMovies),
      maxVoteCount: this.getMaxVoteCount(this.secondMovies)
    };

  }


}
