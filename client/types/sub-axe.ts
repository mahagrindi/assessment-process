interface SubAxeType {
  id: number;
  sub_axe_name: string;
  visibility?: boolean;
  createdAt?: string;
}

type subAxeResponseType = PageableType & {
  content: SubAxeType[];
};

type subAxelist = SubAxeType[];
 