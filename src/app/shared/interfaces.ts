export interface IUser {
  email: string
  password: string
}

export interface ICategory {
  id?: string
  priznak: Priznak.income | Priznak.rashod
  category1: string
  category2?: string
  category3?: string
  category4?: string
}

export interface IHistory {
  id?: number
  name: string
  category: ICategory
  description?: string
  price?: number
  qntyOrWeight?: QntyOrWeight | null
  qntyOrWeightNum?: number
  date?: Date
  createdBy?: IUser
}

export enum QntyOrWeight {
  qnty = 'qnty',
  weight = 'weight'
}

export enum Priznak {
  income = 'Доход',
  rashod = 'Расход'
}
