import styles from "./index.less"
import * as category from "../../servies/category"
import * as article  from "../../servies/article"
import Link from 'umi/link';
import { Layout, Divider, List } from 'antd';

export default class RightSider extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            hostArticls:[],
            categories: [],    
        }
    }

    componentDidMount(){
        this.fetch()
    }

    fetch = ()=> {
        category.find().then(res=>{
            if (res && res.data){
                this.setState({categories: res.data})
            }
        })
        article.find().then(res=>{
            if (res && res.data){
                this.setState({hostArticls: res.data})
            }
        })
    }

    render(){
        const {hostArticls, categories} = this.state;
        return (
            <div className={styles["body"]}>
                 <List 
                 header={<div className={styles["name"]}>分类</div>}
                 bordered
                 dataSource={categories}
                 renderItem={item => (<List.Item><Link to="">{item.name}</Link></List.Item>)}
                 />
                <div className={styles["fenge"]}></div>
                 <List 
                      header={<div className={styles["name"]}>热门</div>}
                      bordered
                      dataSource={hostArticls}
                      renderItem={item => (<List.Item><Link to={`/article/${item.id}`}>{item.title}</Link></List.Item>)}
                 />
            </div>
        )
    }
}