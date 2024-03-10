import React from 'react';
import { Column } from '@ant-design/plots';
import { useProducts } from '../../../context/Products.context';

const BarChart = () => {
  const { products } = useProducts();

  const config = {
    data: products,
    xField: 'name',
    yField: 'price',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'bottom',
      // 'top', 'bottom', 'middle',
      // 配置样式
      // style: {
      //   fill: '#FFFFFF',
      //   opacity: 0.6,
      // },
    },

    axis: {
      y: { title: 'Product price' },
      x: { title: 'Manufacturers name' },
    },
    meta: {
      type: {
        alias: 'test',
      },
      sales: {
        alias: 'asdf',
      },
    },
  };
  return <Column {...config} />;
};

export default BarChart;
