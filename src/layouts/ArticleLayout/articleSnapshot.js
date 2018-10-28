import styles from "./index.less"
import moment  from "moment"


export default class ArticleSnapshot extends React.Component {
    render(){
        const {title, imageUrl, description, createdAt} = this.props;
        return (
        <div className={styles["snapshot"]}>
            <div className={styles["row1"]}>
                    {"这是标题"||title}
            </div>
            <div className={styles["row2"]}>
                    <div className={styles["img"]}><img width="250px" height="150px" src="http://img2.imgtn.bdimg.com/it/u=2933760192,526571840&fm=26&gp=0.jpg"></img></div>
                    <div>{"这是简介"}</div>
            </div>
            <div className={styles["row3"]}>
               <div className="createdAt">{moment().format("YYYY-MM-DD HH:mm:ss")}</div>
               <div className={styles["category"]}>分类1</div>
               <div className={styles["comments"]}>123</div>
             </div>
        </div>
        )
    }
}
