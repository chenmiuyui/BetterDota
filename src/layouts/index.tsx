import styles from './index.less';
import { IRouteComponentProps } from 'umi'
import {Layout, Menu, Space, Button} from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'
import React, {useEffect} from 'react';
const { Header, Content, Footer, Sider } = Layout;

function Foot(){
  return(
      <DefaultFooter
    copyright="山亭夏日"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'xsy&cll',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/chenmiuyui/BetterDota',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'DotterBetter',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
  )
}
function BasicLayout({ children, location, route, history, match }:IRouteComponentProps){
  // console.log({ children, location, route, history, match });
  const s = location.pathname.startsWith.bind(location.pathname)
  const defaultSelectedKeys = [s("/news") ? '2' : s("/hero") ? '3' : s("community") ? '4' : '1'];
  return(
    <Layout>
        <Header className={styles.header}>
            <Layout>
              <div className={styles.logo} />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={defaultSelectedKeys}>
                <Menu.Item key="1" className={styles.nav} onClick={() => history.push("/")}>主页</Menu.Item>
                <Menu.Item key="2" className={styles.nav} onClick={() => history.push("/news")}>新闻</Menu.Item>
                <Menu.Item key="3" className={styles.nav} onClick={() => history.push("/hero")}>英雄</Menu.Item>
                <Menu.Item key="4" className={styles.nav}>社区</Menu.Item>
              </Menu>
            </Layout>
            <Button type="primary" onClick={() => history.push("/login")}>登录</Button>
        </Header>
        <Content className={styles.siteLayout} style={{  }}>
          <div className={styles.siteLayoutBackground} style={{ padding: 24, minHeight: 380 }}>
            { children }
          </div>
        </Content>
      <Footer>
          <Foot></Foot>
      </Footer>
      </Layout>
  )
}

export default BasicLayout;
