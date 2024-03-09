export interface IManufacturer {
  id: string;
  name: string;
}

export interface INewManufacturer extends IManufacturer {
  id: string;
  name: string;
  shouldBeAdded: boolean;
}
