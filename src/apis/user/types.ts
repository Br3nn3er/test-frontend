export type CreateData = {
  name: string;
  email: string;
  password: string;
  siap?: string;
  isAdmin: boolean;
};

export type UpdateData = {
  name?: string;
  isAdmin?: boolean;
};
