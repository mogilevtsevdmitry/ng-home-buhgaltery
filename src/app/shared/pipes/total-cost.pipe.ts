import {Pipe, PipeTransform} from '@angular/core'
import {IHistory} from '../interfaces'

@Pipe({
  name: 'totalCost',
  pure: false,
})
export class TotalCostPipe implements PipeTransform {
  transform(historyData: IHistory[], value: string): number {
    const arr1: IHistory[] = historyData.filter(el => el.name.toLowerCase().includes(value.trim().toLowerCase()))
    const arr2: IHistory[] = historyData.filter(el => el.category.category1.toLowerCase().includes(value.trim().toLowerCase()))
    const arr3: IHistory[] = historyData.filter(el => el.category.category2?.toLowerCase().includes(value.trim().toLowerCase()))
    const arr4: IHistory[] = historyData.filter(el => el.category.category3?.toLowerCase().includes(value.trim().toLowerCase()))
    const arr5: IHistory[] = historyData.filter(el => el.category.category4?.toLowerCase().includes(value.trim().toLowerCase()))
    const arr6: IHistory[] = historyData.filter(el => el.category.priznak?.toLowerCase().includes(value.trim().toLowerCase()))

    const arrArrays: [IHistory[], IHistory[], IHistory[], IHistory[], IHistory[], IHistory[]] = [arr1, arr2, arr3, arr4, arr5, arr6]
    let longestArr: IHistory[] = arrArrays[0]
    let longest: number = 0

    arrArrays.forEach(arr => {
      if (arr.length > longest) {
        longestArr = arr
        longest = arr.length
      }
    })
    const arr: number[] = []
    longestArr.forEach((el) => {
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
