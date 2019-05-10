import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit, OnChanges {

  @Input() myData;
  @ViewChild('myChart') private chartRef;
  chart: any;
  colors = []; /* ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c',
            '#fabebe', '#008080', '#e6beff', '#1F9824', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
            '#000075', '#808080', '#003797']; */

  constructor() {
    const resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(500)
    ).subscribe( () => {
      this.chart.resize();
    });
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      responsive: true,
      maintainAspectRatio: false,
      type: 'doughnut',
      data: {
        labels: this.myData.labels,
        datasets: [{
          data: this.myData.data,
          backgroundColor: this.colors
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
           display: false
        }
      }
    });
  }

  ngOnChanges() {
    this.fillColors();
    this.chart.data.labels = this.myData.labels;
    this.chart.data.datasets[0].data = this.myData.data;
    this.chart.data.datasets[0].backgroundColor = this.colors;
    this.chart.update();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  fillColors() {
    this.colors = [];
    for (let index = 0; index < 20; index++) {
      this.colors.push(this.getRandomColor());
    }
  }

}
