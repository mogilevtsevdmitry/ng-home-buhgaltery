import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {

  @Input() labels: string[] = []
  @Input() data: number[] = []

  chartOptions = {
    responsive: true,
  }

}
