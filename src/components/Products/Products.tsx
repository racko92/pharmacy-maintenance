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
import ConfirmationModal from '../shared/ConfirmationModal/ConfirmationModal';
import styles from './Products.module.scss';
import dayjs from 'dayjs';

const Products = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [productForDeletion, setProductForDeletion] = React.useState<
    IProduct | undefined
  >();
  const { products, deleteProduct } = useProducts();

  const handleEditProduct = (product: IProduct) => {
    navigate(`edit/${product.id}`);
  };

  const handleDeleteProduct = (product: IProduct) => {
    setProductForDeletion(product);
  };

  const deletionModalContent = () => (
    <p>
      Are you sure you want to delete Product with name
      <b>{` ${productForDeletion?.name} `}</b>
      manufactured by
      <b>{` ${productForDeletion?.manufacturer.name} `}</b>
    </p>
  );

  const handleProductDeletion = () => {
    productForDeletion && deleteProduct(productForDeletion);
    setProductForDeletion(undefined);
  };

  return (
    <div>
      <List
        size="small"
        className={styles.list}
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
        pagination={{
          pageSize: pageSize,
          pageSizeOptions: [5, 10, 20, 50, 100],
          showSizeChanger: true,
          onShowSizeChange: (_current: number, size: number) => {
            setPageSize(size);
          },
        }}
        renderItem={(product: IProduct) => (
          <List.Item>
            <span className={styles.itemWrapper}>
              <b>{product.name}</b>
            </span>
            <span className={styles.itemWrapper}>
              {product.manufacturer.name}
            </span>
            <span className={styles.itemWrapper}>{product.price}€</span>
            <span
              className={`${styles.itemWrapper} ${dayjs(product.expiryDate).isBefore(dayjs()) && styles.pastDate}`}
            >
              {dayjs(product.expiryDate).format('DD.MM.YYYY')}
            </span>
            <div className={styles.productControls}>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => handleEditProduct(product)}
              />
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteProduct(product)}
              />
            </div>
          </List.Item>
        )}
      />
      <ConfirmationModal
        isModalOpen={!!productForDeletion}
        title="Delete product?"
        content={deletionModalContent()}
        handleOk={handleProductDeletion}
        handleCancel={() => setProductForDeletion(undefined)}
      />
    </div>
  );
};

export default Products;
