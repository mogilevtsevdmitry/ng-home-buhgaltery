import {Pipe, PipeTransform} from '@angular/core'
import {unique} from '../Util'

@Pipe({
  name: 'unique',
  pure: false,
})
export class UniquePipe implements PipeTransform {
  transform(
    arr: any[],
    category1: any = null,
    category2: any = null,
    category3: any = null,
  ): any {
    if (category1 && category2 && category3) {
      return arr
        .filter((ar) => ar.category1 === category1)
        .filter((ar) => ar.category2 === category2)
        .filter((ar) => ar.category3 === category3)
        .map((val: any) => val['category4'])
        .filter(unique)
        .sort()
    } else if (category1 && category2 && !category3) {
      return arr
        .filter((ar) => ar.category1 === category1)
        .filter((ar) => ar.category2 === category2)
        .map((val: any) => val['category3'])
        .filter(unique)
        .sort()
    } else if (category1 && !category2 && !category3) {
      return arr
        .filter((ar) => ar.category1 === category1)
        .map((val: any) => val['category2'])
        .filter(unique)
        .sort()
    } else {
      return arr
        .map((val: any) => val['category1'])
        .filter(unique)
        .sort()
    }
  }
}
