interface AxeType {
  id?: string
  axeName: string
  axeDescription: string
  status: boolean
  createdAt?: string
  axeSubs: AxeSubType[]
}

interface AxeSubType {
  id?: string
  axeSubName: string
  axeSubDescription: string
  status: boolean
  axeSubWeight: number
  createdAt: Date
  axe: AxeType
  criteriaCount: number
}

interface AxeSubCriteriaType {
  id?: string
  axeSubCriteriaName: string
  axeSubCriteriaDescription: string
  status: boolean
  axeSubCriteriaWeight: number
  axeSub: AxeSubType
}

type AxeResponseType = PageableType & {
  content: AxeType[]
}

type AxeSubCriteriaResponseType = PageableType & {
  content: AxeSubCriteriaType[]
}
