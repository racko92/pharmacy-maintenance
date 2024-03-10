import React from 'react';
import { Space, Alert } from 'antd';
import styles from './ManufacturerAlert.module.scss';

interface IManufacturerAlertProps {
  isDuplicate: boolean;
}

const ManufacturerAlert = ({ isDuplicate }: IManufacturerAlertProps) => (
  <Space direction="vertical" className={styles.space}>
    {isDuplicate ? (
      <Alert
        message="Manufacturer with same name is already existing"
        type="error"
        className={styles.alert}
      />
    ) : (
      <Alert
        message="Addition of only one manufacturer is allowed per product"
        type="info"
        className={styles.alert}
      />
    )}
  </Space>
);

export default ManufacturerAlert;
