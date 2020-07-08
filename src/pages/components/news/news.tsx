import React from 'react';
import styles from './news.less';
import {Layout} from 'antd'
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const {Header, Content, Footer} = Layout

type News = {id: Number, title: string, content: string, username: Number, datetime: string, image: string}
type NewsProps = {news: News}

export default function News(props: NewsProps){
  const date = new Date(props.news.datetime)
  return (
    <Layout className={styles.news}>
      <Header className={`${styles.header}`}>
        <Title className={`${styles.title} ${styles.pl1em}`}>
          { props.news.title }
        </Title>
        <Layout className={`${styles.pl1em} ${styles.desc}`}>
          <Text> <Text underline>{ props.news.username }</Text> 发表于 {date.toLocaleString()} </Text>
        </Layout>
      </Header>
      <Content className={`${styles.pl1em} ${styles.desc}`}>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: '查看全部' }} >
          {
            props.news.content.split(/\n+/).map(elem => (
              <>
                <Text>{ elem }</Text>
                <br />
              </>
            ))
          }
        </Paragraph>
      </Content>
      {/* <Footer className={`${styles.pl1em} ${styles.footer}`}>
        {<a>阅读更多...</a>|
        <a>发表评论</a>}
      </Footer> */}
    </Layout>
  )
}
