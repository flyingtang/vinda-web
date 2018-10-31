import * as article  from "../../servies/article"
import {message} from "antd"
import styles from  "./index.less"
import "./imageload"


export default class Article extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            article : {},
        }
    }
    componentDidMount(){
        const id = this.props.match.params && this.props.match.params.id;
       if (id){
        article.findById(id).then(res=>{
          
            if (res && res.data) {
                this.setState({article: res.data})
            }
        })
       }else{
           message.error("无效的ID参数")
       }  
    }
    render() {
        const {article:{title, mainPic, description, createdAt, id, content}={}} = this.state;
        return (
            <div className={styles["article"]}>
                <div className={styles["header"]}>{title}</div>
                <div className={styles["body"]}  dangerouslySetInnerHTML={{ __html: content}}></div>
            </div>
        )
    }
}