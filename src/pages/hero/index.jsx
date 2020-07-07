import {Layout,Select,Row, Col} from 'antd'
import styles from './hero.less'
import {useState,useEffect} from 'react'
const OPTIONS = ['打野', '线上', '发育', '辅助']
const Tag = [
    {
        name:"力量",
        tag:"liliang"
    }
    ,{
        name:"智力",
        tag:"zhili"
    },
    {
        name:"力量",
        tag:"minjie"
    }
]
const hero = {
    "minjie" : [
        {   
            name:"sv",
            imgSrc:"/heros/sven_sb.png"
        },
        {
            name:"sv",
            imgSrc:"/heros/earthshaker_sb.png"
        },
        {
            name:"sv",
            imgSrc:"/heros/tiny_sb.png"
        },
        {
            name:"sv",
            imgSrc:"/heros/sven_sb.png"
        },
    ],
    "liliang":[
        {
            name:"sv",
            imgSrc:"/heros/sven_sb.png"
        },
        {
            name:"sv",
            imgSrc:"/heros/sven_sb.png"
        },
    ],
    "zhili":[
        {
            name:"sv",
            imgSrc:"/heros/sven_sb.png"
        },
        {
            name:"sv",
            imgSrc:"/heros/sven_sb.png"
        },
    ]
}
class SelectWithHiddenSelectedOptions extends React.Component {
  state = {
    selectedItems: [],
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    return (
      <Select
        mode="multiple"
        placeholder="全部"
        value={selectedItems}
        onChange={this.handleChange}
        style={{ width: '20%',margin:"4px"}}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
function HeroList(props){
    return(
         <div style={{display:"flex",flexFlow:"row"}}>
            <div className={styles.content}>
                <Row gutter={16}>
                    {   
                        console.log(1),
                        console.log(props.category)
                        // props.category.map(intro=>(
                        //     <Col className="gutter-row" span={6} onClick={introduce}>
                        //         <img  src={require(`@/assets${intro.imgSrc}`)} alt=""/>
                        //     </Col>
                        // ))
                    }
                </Row>  
            </div>
         </div>
    )
}

export default function Hero(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heros, setHeros] = useState([]);


  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setHeros(result);
          window.i = result
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
    if (error) {
    return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Loading...</div>;
}else{
    return(
        <Layout className={styles.main}>
            <div style={{display:"flex",flexFlow:"row",justifyContent:"center"}}>
                <SelectWithHiddenSelectedOptions/>
                <SelectWithHiddenSelectedOptions/>
                <SelectWithHiddenSelectedOptions/>
            </div>
            <HeroList category={heros.zonghe}></HeroList>
            <HeroList category={heros.zonghe}></HeroList>
            <HeroList category={heros.zonghe}></HeroList>
            <div className={styles.showHero}>
                这是介绍
            </div>
        </Layout>
        
    )}
}