interface CriteriaType {
  id: String
  criterionName: String
  visibility?: boolean
  fk_subaxe_id?: String
}

type CriteriaResponseType = PageableType & {
  content: CriteriaType[]
}

type Criterialist = CriteriaType[]
