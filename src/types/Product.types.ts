import { IManufacturer } from './Manufacturer.types';

export interface IProduct {
  id?: string;
  name: string;
  manufacturer: IManufacturer;
  price: number;
  expiryDate: Date;
}

export interface IProductForm {
  id?: string;
  name: string;
  manufacturerId: string;
  price: string;
  expiryDate: Date;
}
