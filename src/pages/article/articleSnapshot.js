import styles from "./index.less"
import moment  from "moment"
import router from 'umi/router'

export default class ArticleSnapshot extends React.Component {

    cliickHancle = (id)=>{
      
        const url = `/article/${id}`
        router.push(url)
    }
    render(){
        const {article:{title, mainPic, description, createdAt, id, author}={}} = this.props;
        return (
        <div className={styles["snapshot"]} onClick={this.cliickHancle.bind(this, id)} >
            <div className={styles["row1"]}>
                    {title}
            </div>
            <div className={styles["row2"]}>
                    <div className={styles["img"]}><img width="250px" height="150px" src={mainPic || "http://img2.imgtn.bdimg.com/it/u=3652839969,2526397191&fm=200&gp=0.jpg"}></img></div>
                    <div className={styles["rightBody"]}>
                        <div className={styles["desc"]}>{description}</div>
                        <div className={styles["row3"]}>
                            <div className={styles["category"]}>作者 :{author}</div>
                            <div className={styles["comments"]}>分类</div>
                            <div className="createdAt">时间： {createdAt && moment(createdAt).format("YYYY-MM-DD HH:mm:ss")||moment().format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                    </div>
            </div>
        
        </div>
        )
    }
}
