import React, { useEffect, useState } from 'react';
import { Layout as AntdLayoutComponent, Menu } from 'antd';
import {
  ProductOutlined,
  QuestionCircleOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Products from '../Products/Products';
import About from '../About/About';
import styles from './Layout.module.scss';
import ProductsProvider from '../../context/Products.context';
import ProductsForm from '../Products/ProductsForm/ProductsForm';
import PieChart from '../Charts/PieChart/PieChart';
import BarChart from '../Charts/BarChart/BarChart';

const { Header, Content, Footer, Sider } = AntdLayoutComponent;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const items: MenuProps['items'] = [
    {
      key: 'products',
      label: 'Products',
      icon: <ProductOutlined />,
      onClick: () => navigate('/products'),
    },
    {
      key: 'statistics',
      label: 'Statistics',
      icon: <AreaChartOutlined />,
      children: [
        {
          key: 'bar-chart',
          label: 'Bar Chart',
          icon: <BarChartOutlined />,
          onClick: () => navigate('/bar-chart'),
        },
        {
          key: 'pie-chart',
          label: 'Pie Chart',
          icon: <PieChartOutlined />,
          onClick: () => navigate('/pie-chart'),
        },
      ],
    },
    {
      key: 'about',
      label: 'About',
      icon: <QuestionCircleOutlined />,
      onClick: () => navigate('/about'),
    },
  ];

  useEffect(() => {
    if (!location) return;
    const url = location.pathname.split('/');
    url.shift();
    setActiveButton(url[0]);
  }, [location]);

  return (
    <AntdLayoutComponent className={styles.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[activeButton]}
        />
      </Sider>
      <AntdLayoutComponent>
        <Header />
        <Content>
          <ProductsProvider>
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="products/add" element={<ProductsForm />} />
                <Route path="products/edit/*" element={<ProductsForm />} />
                <Route path="products" element={<Products />} />
                <Route path="pie-chart" element={<PieChart />} />
                <Route path="bar-chart" element={<BarChart />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<>404</>} />
              </Route>
            </Routes>
          </ProductsProvider>
        </Content>
        <Footer className={styles.footer}>
          Vladimir Racković © {new Date().getFullYear()}
        </Footer>
      </AntdLayoutComponent>
    </AntdLayoutComponent>
  );
};

export default Layout;
