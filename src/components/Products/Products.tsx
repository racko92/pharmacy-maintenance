import React from 'react';
import { useProducts } from '../../context/Products.context';
import { List, Button } from 'antd';
import { IProduct } from '../../types/Product.types';
import {
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  return (
    <List
      size="small"
      header={<h2>Pharmacy Products list</h2>}
      footer={
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={() => navigate('add')}
        >
          Add new product
        </Button>
      }
      bordered
      dataSource={products}
      renderItem={(product: IProduct) => (
        <List.Item>
          <span>
            <b>{product.name}</b>
          </span>
          <span>{product.manufacturer.name}</span>
          <div>
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </div>
        </List.Item>
      )}
    />
  );
};

export default Products;
