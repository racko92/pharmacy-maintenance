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

const ProductsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [manufacturerInput, setManufacturerInput] = React.useState<string>('');
  const [newManufacturer, setNewManufacturer] =
    React.useState<INewManufacturer>();
  const { products, manufacturers, addProduct, editProduct } = useProducts();
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const manufacturersForSelect = React.useMemo(() => {
    return manufacturers
      .concat(newManufacturer ? [newManufacturer] : [])
      .map((manufacturer) => ({
        value: manufacturer.id,
        label: manufacturer.name,
      }));
  }, [manufacturers, newManufacturer]);

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
      shouldBeAdded: true,
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
      rules: [{ required: true, message: 'Product name is required', min: 3 }],
      render: <Input className={styles.inputField} />,
    },
    {
      label: 'Manufacturer',
      name: 'manufacturerId',
      rules: [{ required: true, message: 'Manufacturer is required' }],
      render: (
        <Select
          className={styles.inputField}
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
            />
          )}
        />
      ),
    },
    {
      label: 'Price',
      name: 'price',
      rules: [{ required: true, message: 'Price is required' }],
      render: <InputNumber min="0" className={styles.inputField}></InputNumber>,
    },
    {
      label: 'Expiry Date',
      name: 'expiryDate',
      rules: [{ required: true, message: 'Expiry date is required' }],
      render: <DatePicker className={styles.inputField} format="DD.MM.YYYY" />,
    },
    {
      name: 'submitButton',
      render: (
        <Button type="primary" htmlType="submit" disabled={submittable}>
          Submit
        </Button>
      ),
    },
  ];

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

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
        });
    }
  }, [products, manufacturers]);

  return (
    <Form
      name="basic"
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
  );
};

export default ProductsForm;
