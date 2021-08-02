import {QntyOrWeight} from './../interfaces'
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'totalByRow',
  pure: false,
})
export class TotalByRowPipe implements PipeTransform {

  transform(value: any): number {
    if (!value.qntyOrWeightNum) {
      return value.price
    }
    return value.qntyOrWeight === QntyOrWeight.qnty ? value.price * value.qntyOrWeightNum : value.price * value.qntyOrWeightNum / 1000
  }

}
