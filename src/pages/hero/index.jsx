import {Layout,Select,Row, Col} from 'antd'
import styles from './hero.less'
import {useState,useEffect} from 'react'
const OPTIONS = ['打野', '线上', '发育', '辅助']
const Tag = [
    {
        name:"力量",
        attribute:0
    }
    ,{
        name:"智力",
        attribute:1
    },
    {
        name:"力量",
        attribute:2
    }
]
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
// function HeroList(props){
//     return(
//          <div style={{display:"flex",flexFlow:"row"}}>
//             {
//                     <div className={styles.content} key={item.Tag}>{item.name}
//                         <Row gutter={16}>
//                             {
//                                 console.log(items.liliang),
//                                 props.hero.map(intro=>(
//                                     <Col className="gutter-row" span={6} onClick={introduce}>
//                                         <img  src={require(`@/assets${intro.imgSrc}`)} alt=""/>
//                                     </Col>
//                                 ))
//                             }
//                         </Row>  
//                     </div>
//          }
//          </div>
//     )
// }

export default function Hero(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [infomation,setInfo] = useState({});
  const [infoIsLoaded,setInfoLoaded] = useState(false);

  function moreInfo(e){
    console.log(e[0])
    // setInfo(heroes[1])
    fetch("http://127.0.0.1/BetterDota/hero?id="+e[0])
    .then(res => res.json())
    .then(
      (result) => {
        setInfo(result)
        window.i = result
        setInfoLoaded(true)
      },
    )
    return(
      <p>information[0].position</p>
    )
  }
  
  useEffect(() => {
    fetch("http://127.0.0.1/BetterDota/allheroes")
      .then(res => res.json())
      .then(
        (result) => {
          setHeroes(result);
          window.i = result;
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
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
            <div style={{display:"flex",flexFlow:"row",justifyContent:"center"}}>
            {
                Tag.map(item=>(
                    <div className={styles.content} >{item.name}
                        <Row gutter={16}>
                            {   
                                heroes.map(intro=>
                                  { 
                                    if(item.attribute == intro.attribute)
                                    return(
                                      <Col span={6} key={intro.name}>
                                        <img src={intro.image} onClick={moreInfo.bind(this,intro.heroid)} alt="" key={intro.name}/>
                                      </Col>
                                    )
                                  },
                                )
                            }
                        </Row>  
                    </div>
                ))
            } 
              </div>
              <div className={styles.showHero} >
              {
                  infoIsLoaded && (
                    <p>fasfasfasf</p>,
                    infomation.map(skill => {
                      {
                        window.a = skill
                      }
                      <p>fasfasfasf</p>,
                      <p>{skill[0]}</p>,
                      <img src={`/static${skill.image}`}/>
                    })
                   )
              }
            </div>
        </Layout>
        
    )}
}