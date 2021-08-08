import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {

  @Input() data: { title: string; value: number } [] | undefined
  labels: string[] = []
  dataChart: number[] = []
  chartOptions = {
    responsive: true,
  }

  ngOnInit() {
    this.labels = this.data?.map(d => d.title) as string[]
    this.dataChart = this.data?.map(d => Math.round(d.value)) as number[]
  }

}
