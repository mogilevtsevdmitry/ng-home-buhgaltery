import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'secondsToDate',
})
export class SecondsToDatePipe implements PipeTransform {

  transform(value: { seconds: number, nanoseconds: number }): Date {
    return new Date(value.seconds * 1000)
  }

}
