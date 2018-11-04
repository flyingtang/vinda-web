import styles from "./index.less"
export default class Video extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isPlay: false,
        }

    }

    // clickHandle = () => {
    //     this.setState({isPlay : !this.state.isPlay})
    // }

    render(){
        const {video} = this.props;
        const url = `/api/v1/video/${video && video.id}`
        return (
            <div className={styles["video"]}>
                <div>
                   {/* {isPlay?<video  autoplay="true" width="320" height="240" src={isPlay?url:""} controls="controls"></video>:null} */}
                   <video  width="240"  height="320" src={url} controls="controls"></video>
                </div>
                <div className={styles["title"]} >
                    {video && video.title}
                </div>
            </div> 
        )
    }
}