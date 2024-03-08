import React, { useState } from 'react';
import { Layout as AntdLayoutComponent, Menu } from 'antd';
import { ProductOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Products from '../Products/Products';
import About from '../About/About';
import styles from './Layout.module.scss';
import ProductsProvider from '../../context/Products.context';

const { Header, Content, Footer, Sider } = AntdLayoutComponent;

const Layout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const items: MenuProps['items'] = [
    {
      key: 'products',
      label: 'Products',
      icon: <ProductOutlined />,
      onClick: () => navigate('/product'),
    },
    {
      key: 'about',
      label: 'About',
      icon: <QuestionCircleOutlined />,
      onClick: () => navigate('/about'),
    },
  ];

  return (
    <AntdLayoutComponent className={styles.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <AntdLayoutComponent>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route
                path="product"
                element={
                  <ProductsProvider>
                    <Products />
                  </ProductsProvider>
                }
              />
              <Route path="about" element={<About />} />

              <Route path="*" element={<>404</>} />
            </Route>
          </Routes>
        </Content>
        <Footer className={styles.footer}>
          Vladimir Racković © {new Date().getFullYear()}
        </Footer>
      </AntdLayoutComponent>
    </AntdLayoutComponent>
  );
};

export default Layout;
