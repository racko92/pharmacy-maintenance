import React from 'react';
import { useProducts } from '../../../context/Products.context';
import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import {
  IManufacturer,
  INewManufacturer,
} from '../../../types/Manufacturer.types';
import { v4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import ManufacturerSelectOption from '../../shared/ManufacturerSelectOption/ManufacturerSelectOption';
import ManufacturerDropdown from '../../shared/ManufacturerDropdown/ManufacturerDropdown';
import { IProduct, IProductForm } from '../../../types/Product.types';
import styles from './ProductsForm.module.scss';
import dayjs from 'dayjs';

const ProductsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const idValue = Form.useWatch('id', form);
  const [manufacturerInput, setManufacturerInput] = React.useState<string>('');
  const [newManufacturer, setNewManufacturer] =
    React.useState<INewManufacturer>();
  const { products, manufacturers, addProduct, editProduct } = useProducts();

  const manufacturersForSelect = React.useMemo(() => {
    return manufacturers
      .concat(newManufacturer ? [newManufacturer] : [])
      .map((manufacturer) => ({
        value: manufacturer.id,
        label: manufacturer.name,
      }));
  }, [manufacturers, newManufacturer]);

  const isDuplicate = React.useMemo(
    () =>
      manufacturers
        .map((manufacturer) => manufacturer.name.toLowerCase())
        .includes(manufacturerInput.toLowerCase()),
    [manufacturerInput]
  );

  const pageTitle = React.useMemo(
    () => `${idValue ? 'Update' : 'Add new'} Product`,
    [idValue]
  );

  const onFinish = (values: IProductForm) => {
    const { manufacturerId, price, ...otherFields } = values;
    const existingManufacturer: IManufacturer | undefined = manufacturers.find(
      (manufacturer) => manufacturer.id === manufacturerId
    );

    const mappedManufacturer =
      existingManufacturer ||
      (newManufacturer && {
        id: newManufacturer.id,
        name: newManufacturer.name,
      });

    mappedManufacturer &&
      (otherFields?.id
        ? editProduct({
            ...otherFields,
            price: parseInt(price),
            manufacturer: mappedManufacturer,
          })
        : addProduct({
            ...otherFields,
            price: parseInt(price),
            manufacturer: mappedManufacturer,
          }));
    setNewManufacturer(undefined);

    navigate('/products');
  };

  const addManufacturer = () => {
    setNewManufacturer({
      id: v4(),
      name: manufacturerInput,
    });
    setManufacturerInput('');
  };

  const renderFormFields = [
    {
      name: 'id',
    },
    {
      label: 'Name',
      name: 'name',
      rules: [
        { required: true, message: 'Product name is required' },
        { min: 3, message: 'Product name must be at least 3 characters long' },
      ],
      render: <Input className={styles.inputField} />,
    },
    {
      label: 'Manufacturer',
      name: 'manufacturerId',
      rules: [{ required: true, message: 'Manufacturer is required' }],
      render: (
        <Select
          className={`${styles.inputField} ${styles.select}`}
          options={manufacturersForSelect}
          optionRender={(option) => (
            <ManufacturerSelectOption
              option={option}
              newManufacturer={newManufacturer}
              setNewManufacturer={setNewManufacturer}
            />
          )}
          dropdownRender={(menu) => (
            <ManufacturerDropdown
              menu={menu}
              newManufacturer={newManufacturer}
              addManufacturer={addManufacturer}
              manufacturerInput={manufacturerInput}
              setManufacturerInput={setManufacturerInput}
              isDuplicate={isDuplicate}
            />
          )}
        />
      ),
    },
    {
      label: 'Price',
      name: 'price',
      rules: [{ required: true, message: 'Price is required' }],
      render: (
        <InputNumber min="0" className={styles.inputField} addonAfter="€" />
      ),
    },
    {
      label: 'Expiry Date',
      name: 'expiryDate',
      rules: [{ required: true, message: 'Expiry date is required' }],
      render: (
        <DatePicker
          className={styles.inputField}
          format="DD.MM.YYYY"
          disabledDate={(current) => current.isBefore(dayjs(), 'day')}
        />
      ),
    },
    {
      name: 'submitButton',
      render: (
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      ),
    },
  ];

  React.useEffect(() => {
    if (
      location.pathname.includes('/edit') &&
      products?.length &&
      manufacturers?.length
    ) {
      const productId = location.pathname.split('/').pop();
      const productToEdit: IProduct | undefined = products.find(
        (product) => product.id === productId
      );

      productToEdit &&
        form.setFieldsValue({
          ...productToEdit,
          manufacturerId: productToEdit.manufacturer.id,
          expiryDate: dayjs(productToEdit.expiryDate),
        });
    }
  }, [products, manufacturers]);

  return (
    <>
      <h2>{pageTitle}</h2>
      <Form
        name="basic"
        className={styles.form}
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {renderFormFields.map((field) => (
          <Form.Item
            key={`${field.name}_field`}
            label={field.label}
            name={field.name}
            rules={field.rules}
          >
            {field.render}
          </Form.Item>
        ))}
      </Form>
    </>
  );
};

export default ProductsForm;
