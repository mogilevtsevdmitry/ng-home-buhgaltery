import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'totalCost',
  pure: false,
})
export class TotalCostPipe implements PipeTransform {
  transform(value: any[]): number {
    const arr: number[] = []
    value.forEach((el) => {
      el.qntyOrWeightNum
        ? arr.push(
        el.qntyOrWeight === 'qnty'
          ? el.qntyOrWeightNum * el.price
          : (el.qntyOrWeightNum * el.price) / 1000,
        )
        : arr.push(el.price)
    })
    return arr.reduce((a, b) => a + b, 0)
  }
}
