import styles from "./index.less"

export default class Left extends React.Component{
    render(){
        return (
        <div className={styles["left"]}>
            <div className={styles["body"]}>
                  {this.props.children}
            </div>
        </div>
        )
    }
}