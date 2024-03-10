import React, { useContext, useState, createContext, useMemo } from 'react';
import { v4 } from 'uuid';
import { IProduct } from '../types/Product.types';
import { IManufacturer } from '../types/Manufacturer.types';
import { products as MOCKED_PRODUCTS } from '../mocks/Products.mocks';

export type IProductContext = {
  products: IProduct[];
  manufacturers: IManufacturer[];
  addProduct: (product: IProduct) => void;
  editProduct: (product: IProduct) => void;
  deleteProduct: (product: IProduct) => void;
  manufacturersByPrice: IManufacturer[];
  cheapestAndPriciestProducts: IProduct[];
};

const ProductsContext = createContext<IProductContext | null>(null);

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProductsContext must be used inside the ProductsProvider'
    );
  }

  return context;
};

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>([...MOCKED_PRODUCTS]);

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

  const addProduct = (product: IProduct) =>
    setProducts((prevState) => [...prevState, { ...product, id: v4() }]);

  const editProduct = (product: IProduct) =>
    setProducts((prevState) =>
      prevState.map((prevProduct) =>
        prevProduct.id === product.id ? product : prevProduct
      )
    );

  const deleteProduct = (product: IProduct) =>
    setProducts((prevState) =>
      prevState.filter((prevProduct) => prevProduct.id !== product.id)
    );

  const cheapestAndPriciestProducts: IProduct[] = useMemo(() => {
    if (products?.length <= 10) return products;
    const clone: IProduct[] = structuredClone(products);
    const sortedFromHighestToLowestPrice = clone.sort(
      (a, b) => b.price - a.price
    );
    const lastIndex = sortedFromHighestToLowestPrice.length - 1;
    const highest = sortedFromHighestToLowestPrice.slice(0, 5);
    const lowest = sortedFromHighestToLowestPrice.slice(
      lastIndex - 5,
      lastIndex
    );

    const mergedHighestAndLowest = highest.concat(lowest);

    return products.filter((product) =>
      mergedHighestAndLowest.find((merged) => merged.id === product.id)
    );
  }, [products]);

  const manufacturersByPrice = useMemo(
    () =>
      products.reduce(
        (acc: IManufacturer[], product: IProduct) =>
          acc.find(
            (manufacturer: IManufacturer) =>
              manufacturer.id === product.manufacturer.id
          )
            ? acc.map((manufacturer) =>
                manufacturer.id === product.manufacturer.id
                  ? {
                      ...manufacturer,
                      priceSum: (manufacturer.priceSum || 0) + product.price,
                    }
                  : manufacturer
              )
            : acc.concat([
                { ...product.manufacturer, priceSum: product.price },
              ]),
        []
      ),
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        manufacturers,
        addProduct,
        editProduct,
        deleteProduct,
        manufacturersByPrice,
        cheapestAndPriciestProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
