interface SubAxeType {
  id: string;
  subaxe_name: string;
  visibility?: boolean;
  createdAt?: string;
  criteriaList ? : CriteriaType [] ;
  fk_axe_id? : String ;
}

type subAxeResponseType = PageableType & {
  content: SubAxeType[];
};

type subAxelist = SubAxeType[];
 