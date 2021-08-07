import {Pipe, PipeTransform} from '@angular/core'
import {IHistory} from '../interfaces'

@Pipe({
  name: 'totalCost',
  pure: false,
})
export class TotalCostPipe implements PipeTransform {
  transform(value: IHistory[], name?: string): number {
    // @ts-ignore
    if (name?.trim().length > 0) {
      // @ts-ignore
      value = value.filter(el => el.name.toLowerCase().includes(name?.trim().toLowerCase()))
    }
    const arr: number[] = []
    value.forEach((el) => {
      el.qntyOrWeightNum
        ? arr.push(
        el.qntyOrWeight === 'qnty'
          ? el.qntyOrWeightNum * Number(el.price)
          : (el.qntyOrWeightNum * Number(el.price)) / 1000,
        )
        : arr.push(Number(el.price))
    })
    return arr.reduce((a, b) => a + b, 0)
  }
}
