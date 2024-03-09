import React from 'react';
import { Space, Alert } from 'antd';
import styles from './ManufacturerAlert.module.scss';

const ManufacturerAlert = () => (
  <Space direction="vertical" className={styles.space}>
    <Alert
      message="Addition of only one manufacturer is allowed per product"
      type="info"
      className={styles.alert}
    />
  </Space>
);

export default ManufacturerAlert;
