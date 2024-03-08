import { IManufacturer } from './Manufacturer.types';

export interface IProduct {
  id: string;
  name: string;
  manufacturer: IManufacturer;
  price: number;
  expiryDate: Date;
}
