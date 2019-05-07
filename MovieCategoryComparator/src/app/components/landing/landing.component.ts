import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild('myChart') private chartRef;
  chart: any;
  movies;

  constructor(private movieS: MovieService) { }

  ngOnInit() {
    setTimeout(() => {
      this.movieS.getMoviesFromAllCategorys().then(adat => {
        console.log('adat');
        console.log(adat);
        this.movies = adat;
        this.createChart();
        this.addDatatoChart();
      }).catch(err => {
        console.log(err);
      });

    }, 2000);

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
        scales: {
          yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                suggestedMax: 10
            }
        }]
        }
    }
    });
  }

  addDatatoChart() {
    const data = this.prepareData('vote_average');
    const tmp = [];
    data.forEach( category => {
      tmp.push({
        x: category.category,
        y: category.value
      });
    });
    console.log('tmp');
    console.log(tmp);
    tmp.forEach( chartData => {
      this.chart.data.datasets.push({
          label: chartData.x,
          data: [chartData],
          backgroundColor: this.getRandomColor()
      });
    });
    console.log('chartData');
    console.log(this.chart.data.datasets);
    this.chart.update();
  }

  prepareData(property) {
    // tslint:disable-next-line:prefer-const
    let preparedData = [];
    console.log(this.movies);
    let i = 0;
    this.movies.forEach(element => {
      // console.log(element);
      let sum = 0;
      let count = 0;
      element.forEach(movie => {
        count++;
        // console.log(movie);
        sum += parseFloat(movie[property]);
        // console.log(sum);
        // console.log(movie);
      });
      preparedData.push({
        category: this.movieS.genres.genres[i].name,
        value:  sum / count
      });
      i++;
    });
    return preparedData;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
