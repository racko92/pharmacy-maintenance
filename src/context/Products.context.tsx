import React, { useContext, useState, createContext } from 'react';
import { IProduct } from '../types/Product.types';

export type IProductContext = {
  products: IProduct[];
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
      id: '7cab6e02-57dd-45db-bb15-3b8758def3cb',
      name: 'First product',
      manufacturer: {
        id: '3eca6e18-745e-4be9-bfa3-61214a864ca7',
        name: 'Best manufacturer',
      },
      price: 123,
      expiryDate: new Date(),
    },
  ]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
