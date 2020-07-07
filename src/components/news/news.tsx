import React from 'react';
import styles from './news.less';
import {Layout} from 'antd'

const {Header, Content, Footer} = Layout

type News = {id: Number, title: string, content: string, username: Number, datetime: string}
type NewsProps = {news: News}

export default function News(props: NewsProps){
  return (
    <Layout className={styles.news}>
      <Header className={`${styles.header}`}>
        <div className={`${styles.title} ${styles.pl1em}`}>
          { props.news.title }
        </div>
        <div className={`${styles.pl1em} ${styles.desc}`}>
          { props.news.username }
        </div>
      </Header>
      <Content className={`${styles.pl1em}`}>{ props.news.content }</Content>
      <Footer className={`${styles.pl1em} ${styles.footer}`}>
        <a>阅读更多...</a>|
        <a>发表评论</a>
      </Footer>
    </Layout>
  )
}
