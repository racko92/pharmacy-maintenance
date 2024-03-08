import React, { useContext, useState, createContext, useMemo } from 'react';
import { v4 } from 'uuid';
import { IProduct } from '../types/Product.types';
import { IManufacturer } from '../types/Manufacturer.types';

export type IProductContext = {
  products: IProduct[];
  manufacturers: IManufacturer[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const ProductsContext = createContext<IProductContext | null>(null);

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProductsContext must be used inside the ProductsContextProvider'
    );
  }

  return context;
};

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>([
    {
      id: v4(),
      name: 'First product',
      manufacturer: {
        id: '6ac48689-63ac-40c6-89e6-035898a7a8be',
        name: 'Best manufacturer',
      },
      price: 123,
      expiryDate: new Date(),
    },
    {
      id: v4(),
      name: 'Second product',
      manufacturer: {
        id: '6ac48689-63ac-40c6-89e6-035898a7a8be',
        name: 'Best manufacturer',
      },
      price: 123,
      expiryDate: new Date(),
    },
  ]);

  const manufacturers = useMemo(
    () =>
      products.reduce(
        (acc: IManufacturer[], product: IProduct) =>
          acc.find(
            (manufacturer: IManufacturer) =>
              manufacturer.id === product.manufacturer.id
          )
            ? acc
            : [...acc, product.manufacturer],
        []
      ),
    [products]
  );

  return (
    <ProductsContext.Provider value={{ products, manufacturers, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
