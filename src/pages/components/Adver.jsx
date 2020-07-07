import {Carousel} from 'antd'
import styles from './index.less'

const data = [{img:'1'},{img:'2'},{img:'3'},{img:'4'}]
export default function Ad(){
    return(
    <Carousel className={styles["ant-carousel"]} dotPosition="top" autoplay>
    {
        data.map((i) => (
            <div className={styles["slick-slide"]} key={i.img}>
                <img src={require(`@/assets/${i.img}.jpeg`)} style={{width:'100%',height:'100%'}}/>
            </div>
        ))
    }
  </Carousel>
    )
}