import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-analitic-card',
  templateUrl: './analitic-card.component.html',
  styleUrls: ['./analitic-card.component.scss'],
})
export class AnaliticCardComponent {

  @Input() footerTitle: string = ''
  @Input() arrowClass: string = 'text-success'
  @Input() arrowIcon: string = 'bi-arrow-up'
  @Input() value: number = 0
  @Input() isLoading: boolean = false
  @Input() monthName: string = ''

}
