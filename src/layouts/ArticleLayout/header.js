import styles from "./index.less"
import Link from 'umi/link';
export default class Header extends React.Component{
    render(){
        return (
        <div className={styles["header"]}>
            <div className={styles["menu"]}> <Link to="/article">文章</Link> </div>
            <div className={styles["menu"]}><a href="http://go-learn.ixiaotang.cn">Golang学习笔记</a> </div>
        </div>
        )
    }
}