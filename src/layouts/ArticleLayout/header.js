import styles from "./index.less"
import Link from 'umi/link';
import { Icon } from "antd";
export default class Header extends React.Component{
    render(){
        return (
        <div className={styles["header"]}>
            <div className={styles["menu"]}> <Link to="/article">首页</Link> </div>
            <div className={styles["menu"]}><Link to="/video">短视频</Link> </div>
            <div className={styles["menu"]}><a href="http://ixiaotang.cn:4005">Golang学习笔记</a> </div>
            <div className={styles["github"]}>开源地址：<a href="https://github.com/txg5214/vinda-api"><Icon type="github" style={{ fontSize: '16px', color: '#08c' }}  theme="outlined" /></a></div>
        </div>
        )
    }
}
