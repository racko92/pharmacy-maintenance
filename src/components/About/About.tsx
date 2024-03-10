import React from 'react';
import { Space, Typography } from 'antd';
import styles from './About.module.scss';
const { Text, Link, Title, Paragraph } = Typography;

const About = () => (
  <Space direction="vertical" className={styles.pageWrapper}>
    <Title level={2}>About page</Title>
    <Space direction="vertical" className={styles.textWrapper}>
      <Text>Version: 0.1.0</Text>
      <Text>
        <span>Author: </span>
        <Link href="mailto:vladimir.rackovic.92@gmail.com">
          Vladimir Racković
        </Link>
        (
        <Link href="https://github.com/racko92" target="_blank">
          github
        </Link>
        )
      </Text>
      <Text>Application is created using react v18.2</Text>
      <section>
        <Title level={3}>Application usage</Title>
        <Title level={4}>Goal:</Title>
        <Paragraph>
          Application main goal is to preview and manage Product prices and
          relations between Products and Manufacturers and have overview
          regarding those relations in form of graphs
        </Paragraph>
        <Title level={4}>Pages:</Title>
        <ul>
          <li>
            <b>Homepage - </b>displayed when user lands enters the app.
          </li>
          <li>
            <b>Products - </b>Product management section. Allows creating of new
            Product and Manufacturer, editing or deletion of existing Products.
          </li>
          <li>
            <b>Statistics - </b>Statistics section is split between two
            different representation of data:
            <ul>
              <li>
                <i>Bar Chart - </i>Displaying 5 of each, most and least
                expensive items in Bar Graph format.
              </li>
              <li>
                <i>Pie Chart - </i>Displaying Pie Chart related to all
                Manufacturers of products, and sum of prices of all products
                made by each manufacturer
              </li>
            </ul>
          </li>
          <li>
            <i>About</i> - Currently previewing
          </li>
        </ul>
      </section>
      <Title level={3}>List of additional packages used: </Title>
      <ul>
        <li>
          <Link href="https://ant.design/">antd</Link>
        </li>
        <li>
          <Link href="https://ant-design-charts-next.antgroup.com/">
            @ant-design/charts
          </Link>
        </li>
        <li>
          <Link href="https://reactrouter.com/">react-router-dom</Link>
        </li>
        <li>
          <Link href="https://sass-lang.com/">sass</Link>
        </li>
        <li>
          <Link href="https://typicode.github.io/husky/">husky</Link>
        </li>
        <li>
          <Link href="https://eslint.org/">eslint</Link>
        </li>
        <li>
          <Link href="https://prettier.io/">prettier</Link>
        </li>
        <li>
          <Link href="https://github.com/thenativeweb/uuidv4">uuidv4</Link>
        </li>
      </ul>
    </Space>
  </Space>
);

export default About;
