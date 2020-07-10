import { List,Tag,Tabs,Typography} from 'antd'
import styles from './index.less'
import {useEffect, useState} from 'react'
const {TabPane} = Tabs;

const {Text} = Typography;
function NewsFooter(){
  return (
        <h2 className={styles.newslistfoot}>
          <Text type="secondary">阅读更多资讯</Text></h2>
  )
}

function ListItems(props){
    return(
        <List
        itemLayout="horizontal"
        className="styles.newsList"
        // header={<Demo/>}
        footer={<NewsFooter/>}
        dataSource={props.news}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Tag color={item.color}>{item.tag}</Tag>}
              title={<a href={item.url}>{item.title}</a>}
            //   description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    );
  }

export default function Newslist(props){
    const [news,setNews] = useState([]);
    const [error,setError] = useState(null)
    // useEffect(() => {
    // fetch("/api/users")
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     setNews(result);
    //     console.log(result)
    //   },
    //   (error) => setError(error)
    // )
    // },[])
    if(error){
      console.log(error);
    }else{
      return(
        <Tabs defaultActiveKey="1">
        <TabPane tab="综合" key="1">
          <ListItems news={news.zonghe}/>
        </TabPane>
        <TabPane tab="公告" key="2">
          <ListItems news={news.gonggao}/>
        </TabPane>
        <TabPane tab="赛事" key="3">
          <ListItems/>
        </TabPane>
        <TabPane tab="攻略" key="4">
          <ListItems/>
        </TabPane>
      </Tabs>)
  }
}
