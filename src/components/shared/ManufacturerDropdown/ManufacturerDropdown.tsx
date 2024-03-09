import React from 'react';
import { Divider } from 'antd';
import ManufacturerAlert from '../ManufacturerAlert/ManufacturerAlert';
import ManufacturerAddSection from '../ManufacturerAddSection/ManufacturerAddSection';
import { INewManufacturer } from '../../../types/Manufacturer.types';
import styles from './ManufacturerDropdown.module.scss';

interface IManufacturerDropdownProps {
  menu: React.ReactElement;
  newManufacturer: INewManufacturer | undefined;
  addManufacturer: () => void;
  manufacturerInput: string;
  setManufacturerInput: React.Dispatch<React.SetStateAction<string>>;
}

const ManufacturerDropdown = ({
  menu,
  newManufacturer,
  addManufacturer,
  manufacturerInput,
  setManufacturerInput,
}: IManufacturerDropdownProps) => (
  <>
    {menu}
    <Divider className={styles.divider} />
    {newManufacturer ? (
      <ManufacturerAlert />
    ) : (
      <ManufacturerAddSection
        newManufacturer={newManufacturer}
        addManufacturer={addManufacturer}
        manufacturerInput={manufacturerInput}
        setManufacturerInput={setManufacturerInput}
      />
    )}
  </>
);

export default ManufacturerDropdown;
