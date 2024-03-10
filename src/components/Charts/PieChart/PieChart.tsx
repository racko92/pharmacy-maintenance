import React from 'react';
import { Pie } from '@ant-design/plots';
import { useProducts } from '../../../context/Products.context';
import styles from '../Charts.module.scss';

const PieChart = () => {
  const { manufacturersByPrice } = useProducts();

  const config = {
    data: manufacturersByPrice,
    angleField: 'priceSum',
    colorField: 'name',
    label: {
      text: 'priceSum',
      position: 'outside',
      formatter: (d: number) => `${d}€`,
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
    tooltip: false,
  };

  return (
    <div className={styles.graphWrapper}>
      <h2>Sum of all product prices by manufacturer</h2>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
