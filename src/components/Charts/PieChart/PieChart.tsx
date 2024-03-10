import React from 'react';
import { Pie } from '@ant-design/plots';
import { useProducts } from '../../../context/Products.context';

const PieChart = () => {
  const { manufacturersByPrice } = useProducts();

  // React.useEffect(() => {
  //   console.log(manufacturersByPrice);
  // }, [manufacturersByPrice]);

  const config = {
    data: manufacturersByPrice,
    angleField: 'priceSum',
    colorField: 'name',
    label: {
      text: 'name',
      style: {
        fontWeight: 'bold',
      },
    },
    // legend: {
    //   color: {
    //     title: false,
    //     position: 'left',
    //     rowPadding: 15,
    //   },
    // },
    tooltip: {
      field: 'priceSum',
      label: 'Products pricing sum by Manufacturer',
      valueFormatter: (d: number) => `${d}Euro`,
    },
  };

  return <Pie {...config} />;
};

export default PieChart;
