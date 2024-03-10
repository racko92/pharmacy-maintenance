export interface IManufacturer {
  id: string;
  name: string;
  priceSum?: number;
}

export interface INewManufacturer extends IManufacturer {
  id: string;
  name: string;
}
