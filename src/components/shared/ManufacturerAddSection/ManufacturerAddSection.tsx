import React from 'react';
import { Space, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { INewManufacturer } from '../../../types/Manufacturer.types';
import styles from './ManufacturerAddSection.module.scss';

interface IManufacturerAddSectionProps {
  newManufacturer: INewManufacturer | undefined;
  addManufacturer: () => void;
  manufacturerInput: string;
  setManufacturerInput: React.Dispatch<React.SetStateAction<string>>;
}

const ManufacturerAddSection = ({
  newManufacturer,
  addManufacturer,
  manufacturerInput,
  setManufacturerInput,
}: IManufacturerAddSectionProps) => (
  <Space className={styles.space}>
    <Input
      placeholder="Please enter item"
      className={styles.input}
      disabled={!!newManufacturer}
      value={manufacturerInput}
      onChange={({ target: { value } }) => setManufacturerInput(value)}
    />
    <Button
      type="text"
      icon={<PlusOutlined />}
      disabled={!manufacturerInput?.length || !!newManufacturer}
      onClick={addManufacturer}
    >
      Add item
    </Button>
  </Space>
);

export default ManufacturerAddSection;
