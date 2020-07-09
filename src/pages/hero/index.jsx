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
        name:"敏捷",
        attribute:1
    },
    {
        name:"智力",
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

export default function Hero(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [infomation,setInfo] = useState({});
  const [infoIsLoaded,setInfoLoaded] = useState(false);

  function moreInfo(e){
    console.log(e)
    // setInfo(heroes[1])
    fetch("http://127.0.0.1/BetterDota/hero?id="+e)
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
            <div style={{display:"flex",flexFlow:"row",justifyContent:"center",marginTop:"40px"}}>
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
                                        <img src={"/static/heros/"+intro.image} onClick={moreInfo.bind(this,intro.heroid)} alt="" key={intro.heroid} style={{width:"70px"}}/>
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
                <div style={{display:"flex"}}>
                    {heroes.map(hero=>{
                      // window.i = hero;
                      
                      if(hero.heroid == infomation[0].heroid){
                        // console.log(hero.heroid == infomation[0].heroid)
                        return(
                          <div style={{marginBottom:"5px",marginRight:"20px"}}>
                            <h1>{hero.name}</h1>
                            <img src={"/static/heros/"+hero.image}/>,
                          </div>
                        )
                      }
                    })}
                    <div style={{display:"flex",flexFlow:"column"}}>
                    {infomation.map(skill => {
                      {
                        // window.a = skill  
                        return(
                          <div style={{display:"block"}}>
                            <div style={{marginRight:"40px"}}><h3>{skill.name}:</h3></div>
                            <span>{skill.description}</span>
                          </div>
                        )
                      }
                    
                    })}
                    </div>
                    </div>
                   )
                  
              }
            </div>
        </Layout>
        
    )}
}
