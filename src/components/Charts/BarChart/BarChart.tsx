import React from 'react';
import { Column } from '@ant-design/plots';
import { useProducts } from '../../../context/Products.context';
import styles from '../Charts.module.scss';

const BarChart = () => {
  const { cheapestAndPriciestProducts } = useProducts();

  const config = {
    data: cheapestAndPriciestProducts,
    xField: 'name',
    yField: 'price',
    colorField: 'name',
    label: {
      formatter: (price: number) => `${price}€`,
      position: 'bottom',
      fill: 'white',
    },
    legend: {
      color: {
        position: 'bottom',
        rowPadding: 15,
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
    axis: {
      y: { title: 'Product price' },
      x: { title: 'Manufacturers name' },
    },
    tooltip: false,
  };
  return (
    <div className={styles.graphWrapper}>
      <h2>Five most and five least expensive products</h2>
      <Column {...config} />
    </div>
  );
};

export default BarChart;
