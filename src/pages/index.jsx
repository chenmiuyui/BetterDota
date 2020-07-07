import { Layout} from 'antd';
import styles from './index.less';
import Newslist from './components/Newslist'
import CardList from './components/CardList'
import Adver from './components/Adver'
const {Content} = Layout;

function IndexLayout (){
  return(
        <Layout>
            <Layout style={{padding:"0 100px"}}>
                <Layout className={styles.row} >
                    <Content className={styles.Content} style={{flex:"2"}}>
                       <Newslist/>
                    </Content>
                    <Content className={styles.Content} style={{flex:"5"}}><Adver /></Content>
                </Layout>
                <Layout className={styles.row}>
                    <Content style={{flex:"2"}} className={styles.Content}></Content>
                    <Content className={styles.Content} style={{flex:'5'}}>
                      <CardList></CardList>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        )
    }
export default IndexLayout;