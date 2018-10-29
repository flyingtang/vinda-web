import styles from "./index.less"
import  RightSider from  "./rightSider"
export default class Right extends React.Component{

    render(){
        return (<div className={styles["right"]}>
            <div className={styles["rightBody"]}>
                <RightSider />
            </div>
        </div>)
    }
}