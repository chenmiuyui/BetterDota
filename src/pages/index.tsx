import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

export default () => {
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className={styles.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content className={styles.siteLayout} style={{ padding: '0 50px', marginTop: 64 }}>
      <div className={styles.siteLayoutBackground} style={{ padding: 24, minHeight: 380 }}>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design Â©2018 Created by Ant UED</Footer>
  </Layout>
  );
}
