import styles from './index.less';
import { IRouteComponentProps } from 'umi'
import {Layout,Menu} from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'
import React from 'react';
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
  return(
    <Layout>
        <Header>
            <div className={styles.logo} />
           
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" className={styles.nav}>主页</Menu.Item>
            <Menu.Item key="2" className={styles.nav}>新闻</Menu.Item>
            <Menu.Item key="3" className={styles.nav}>英雄</Menu.Item>
            <Menu.Item key="4" className={styles.nav}>社区</Menu.Item>
            </Menu>
        </Header>
        {children}
      <Footer>
          <Foot></Foot>
      </Footer>
      </Layout>
  )
}

// function BasicLayout({ children, location, route, history, match }:IRouteComponentProps) {
//     return (
//       children
//     )
// }

export default BasicLayout;
