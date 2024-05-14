interface AxeType {
  id?: string;
  axe_name: string;
  visibility?: boolean;
  note?: number;
  createdAt?: Date;
  coefficient?: number;
  numberOfProgram?: number; // Corrected property name
  description: string;
  subAxes?: SubAxeType[]; // Made subAxes optional
}

type AxeResponseType = PageableType & {
  content: AxeType[];
};