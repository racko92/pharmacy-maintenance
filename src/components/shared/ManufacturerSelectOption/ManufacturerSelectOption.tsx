import React from 'react';
import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { BaseOptionType } from 'antd/es/select';
import { INewManufacturer } from '../../../types/Manufacturer.types';
import styles from './ManufacturerSelectOption.module.scss';

interface IManufacturerSelectOptionProps {
  option: BaseOptionType;
  newManufacturer: INewManufacturer | undefined;
  setNewManufacturer: React.Dispatch<
    React.SetStateAction<INewManufacturer | undefined>
  >;
}

const ManufacturerSelectOption = ({
  option,
  newManufacturer,
  setNewManufacturer,
}: IManufacturerSelectOptionProps) => (
  <div className={styles.wrapper}>
    <span>{option.label}</span>
    {option.value === newManufacturer?.id && (
      <Button
        type="text"
        shape="circle"
        size="small"
        icon={<CloseCircleFilled />}
        danger
        onClick={(event) => {
          event.stopPropagation();
          setNewManufacturer(undefined);
        }}
      />
    )}
  </div>
);
export default ManufacturerSelectOption;
