import styles from "./index.less"
import ArticleSnapshot from "./articleSnapshot"
export default class Header extends React.Component{
    render(){
        return (
        <div className={styles["left"]}>
            <div className={styles["body"]}>
                  <ArticleSnapshot />
            </div>
          
        </div>
        )
    }
}