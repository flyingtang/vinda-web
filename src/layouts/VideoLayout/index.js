
import { Layout } from 'antd';
import styles from "./index.less"
const { Header, Footer, Sider, Content } = Layout;


export default class VideoLayout extends React.Component {
    render(){
        return (
                 <Layout className={styles["layout"]}>
                    <Header  className={styles["header"]}>在线视频播放</Header>
                    <Content className={styles["content"]}>{this.props.children}</Content>
                </Layout>
        )
    }
}