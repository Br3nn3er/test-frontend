export type CreateData = {
  campus: string;
  code: string;
  name: string;
  periodClash: boolean;
  timeClash: boolean;
  unit: string;
};

export type UpdateData = {
  campus?: string;
  name?: string;
  periodClash?: boolean;
  timeClash?: boolean;
  unit?: string;
};
