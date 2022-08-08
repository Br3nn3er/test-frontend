import ApiService from '@services/ApiService';

export interface BaseCRUD<T, PK, CreateData, UpdateData> extends FindAll<T> {
  [key: string]: (...args) => Promise<T | T[] | void>;
  create?(data: CreateData): Promise<T>;
  findOne?(pk: PK): Promise<T>;
  remove?(pk: PK): Promise<void>;
  update?(pk: PK, data: UpdateData): Promise<T>;
}

export interface FindAll<T> {
  findAll(): Promise<T[]>;
}

export type API<T> = (api: ApiService) => T;

export type BaseCRUDApi<T, PK, CreateData = any, UpdateData = any> = API<
  BaseCRUD<T, PK, CreateData, UpdateData>
>;
