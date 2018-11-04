import * as video from "../../servies/video"
import styles from "./index.less"
import Video from "./video"
import { Divider, Pagination} from "antd";

export default class VideoComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            videos:[],
            total: 0,
            pageSize: 0,
            limitRate: 0,
        }
    }

    componentDidMount(){
        this.fetch({page:1})
    }

    fetch = async (filter) => {
        video.find(filter).then(res=>{
            if(res && res.data){
                this.setState({videos: res.data, total: res.total, pageSize: res.pageSize, limitRate: res.limitRate})
            }
        });
    }

    handleChange = (page, pageSize) => {
        this.fetch({page:page})
      }

    render(){
        const {total, videos, pageSize, limitRate} = this.state
        return (
            <div className={styles["videocomponent"]}>
                <div className={styles["tip"]}>注意：!!!服务器限制同时缓冲 &nbsp;{limitRate}&nbsp; 个!!! &nbsp;&nbsp;所有视频均来自互联网</div>
                <Divider />
                <div className={styles["content"]}>
                    {
                        videos.map(v => <Video key={v.id} video={v}/>)
                    }
                </div>
                <div className={styles["pag"]}>
                    <Pagination onChange={this.handleChange.bind(this)} pageSize={pageSize} defaultCurrent={1}  total={total} />
                </div>
            </div>
        )
    }
}