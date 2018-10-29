import { Layout, Divider } from 'antd';

import  styles from './index.less';
import CustomHeader from "./header";
import Left from "./left"
import Right from "./right"
const { Header, Sider, Content } = Layout;


export default class InterfaceLayout extends React.Component {
    render (){
        return (
            <div className={styles["layout"]}>  
                    <div> <CustomHeader /></div>
                    <Divider className={styles["divider"]}/>
                    <div className={styles["body"]}>
                        <Left {...this.props}/>
                        <Divider className={styles["divider"]} type="vertical"/>
                        <Right />
                    </div>
            </div>
        )
    }
}