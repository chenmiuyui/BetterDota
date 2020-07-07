import { IRouteComponentProps, history } from 'umi'
import React, {useEffect} from 'react';
import {Layout, Menu, Breadcrumb, Anchor} from 'antd';
import styles from "./index.less";

const { Header, Footer, Sider, Content } = Layout;
const { Link } = Anchor;

function BasicLayout({ children, location, route, history, match }: IRouteComponentProps) {
  useEffect(() => {
    document.title = "BetterDota2"
  }, [])
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className={styles.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" onClick={() => history.push("/")}>主页</Menu.Item>
        <Menu.Item key="2" onClick={() => history.push("/news")}>新闻</Menu.Item>
      </Menu>
    </Header>
    <Content className={styles.siteLayout} style={{ padding: '0 50px', marginTop: 64 }}>
      <div className={styles.siteLayoutBackground} style={{ padding: 24, minHeight: 380 }}>
        { children }
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default BasicLayout;
