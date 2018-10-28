import styles from "./index.less"

export default class RightSider extends React.Component {
    

    render(){
        return (
            <div className={styles["body"]}>
                  <div className={styles["row1"]}>
                    <div className={styles["name"]}>{"分类"}</div>
                    <div className={styles["content"]}>
                        <div>分类1</div>
                        <div>分类1</div>
                        <div>分类1</div>
                        <div>分类1</div>
                    </div>
                  </div>  
                  <div className={styles["row2"]}>
                  <div className={styles["name"]}>热门</div>
                    <div className={styles["content"]}>
                        <div>热门</div>
                        <div>热门</div>
                        <div>热门</div>
                        <div>热门</div>
                    </div>
                  </div>  
                  {/* <div className={styles["row3"]}>row1</div>   */}
            </div>
        )
    }
}