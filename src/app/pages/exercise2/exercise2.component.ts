import { Component, ViewChild } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { CovidData } from '../../models/covid.model';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { TableComponent } from "../../components/table/table.component";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-exercise2',
  standalone: true,
  imports: [
    NgApexchartsModule,
    TableComponent
],
  templateUrl: './exercise2.component.html',
  styleUrl: './exercise2.component.scss'
})
export class Exercise2Component {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;
  public showGraphic = false;
  public covidData!: CovidData[];
  public tableHead: string[] = [
    '#',
    'Fecha',
    'Casos',
    'Muertes',
    'Tests'
  ];
  public tableData!: string[][];
  constructor(private covidservice: CovidService) {
    
  }

  ngOnInit() {
    
    this.getdata();
  }

  getdata() {
    this.covidservice.getData().subscribe(data => {
      this.showGraphic = true;
      this.covidData = data;
      
      this.tableData = this.covidData.map(item => [item.date, String(item.cases), String(item.deaths), String(item.tests)])
      this.chartOptions = {
        series: [
          {
            name: "Casos",
            data: this.covidData.map(item => [new Date(item.date).getTime(), item.cases])
          },
          {
            name: "Tests",
            data: this.covidData.map(item => [new Date(item.date).getTime(), item.tests])
          },
          {
            name: "Muertes",
            data: this.covidData.map(item => [new Date(item.date).getTime(), item.deaths])
          }
        ],
        chart: {
          type: "line",
          height: 600,
          stacked: false,
          events: {
            selection: function(chart, e) {
              console.log(new Date(e.xaxis.min));
            }
          }
        },
        colors: ["#008FFB", "#00E396", "#feb019"],
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          opposite: false
        }
      }
    })
  }
}
