import React, { useEffect } from 'react';
import { useProducts } from '../../../context/Products.context';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Space,
  DatePicker,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ProductsForm = () => {
  const { products, manufacturers } = useProducts();

  const onFinish = () => {
    console.log('onFinish');
  };
  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  useEffect(() => {
    console.log(manufacturers);
  }, [manufacturers]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // id: string;
  // name: string;
  // manufacturer: IManufacturer;
  // price: number;
  // expiryDate: Date;

  return (
    <Form
      name="basic"
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Product name is required', min: 3 },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Manufacturer"
        name="manufacturer"
        rules={[{ required: true, message: 'Manufacturer is required' }]}
      >
        <Select
          options={manufacturers.map((manufacturer) => ({
            label: manufacturer.name,
            value: manufacturer.id,
          }))}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="Please enter item"
                  // ref={inputRef}
                  // value={name}
                  // onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  // onClick={addItem}
                >
                  Add item
                </Button>
              </Space>
            </>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Price is required' }]}
      >
        <InputNumber min="0" style={{ width: '100%' }}></InputNumber>
      </Form.Item>

      <Form.Item
        label="Expiry Date"
        name="expiryDate"
        rules={[{ required: true, message: 'Expiry date is required' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductsForm;
