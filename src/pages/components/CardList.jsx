import {Card} from 'antd';
import styles from './index.less';
const data = [
  {
    src:"1.jpeg",
    content:"a"
  },
  {
    src:"2.jpeg",
    content:"b"
  },
  {
    src:"3.jpeg",
    content:"c"
  },
  {
    src:"4.jpeg",
    content:"d"
  },
]
function CardList(props){
  return(
    <div className={styles.row}>
    {/* <Row gutter={16}> */}
      
        {
          Array(4).fill(0).map((e,i)=>(
          // <Col span={6}>
            <Card title={props.title} bordered={false} hoverable={true} key={i} className={styles.card}
             cover={<img alt="example" src={require(`@/assets/${data[i].src}`)} style={{width:"90%",marginRight:"4px"}}/>}
             >
        {data[i].content}
          </Card>
          // </Col>
          ))
        }
    {/* </Row> */}
  </div>
  )
}
export default CardList;