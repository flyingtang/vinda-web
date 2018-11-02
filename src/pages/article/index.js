
import ArticleSnapshot from "./articleSnapshot"
import * as article  from "../../servies/article"
import { Pagination } from 'antd';
import styles from "./index.less"

class ArticlsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page: 1,
            articles: [],
            total: 0,
        }
    }
    componentDidMount(){
        this.fetch({order: "createdAt desc"})
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
          }
    }

    fetch = (filter)=>{
        console.log(filter, "12212")
        article.find(filter).then(res=>{
            if (res && res.data){
                this.setState({articles: res.data, total: res.total})
            }
        })
    }

    onScrollHandle(event) {
        console.log(122121)
        const clientHeight = event.target.clientHeight
        const scrollHeight = event.target.scrollHeight
        const scrollTop = event.target.scrollTop
        const isBottom = (clientHeight + scrollTop === scrollHeight)
        console.log('is bottom:' + isBottom)
      }
    
      componentWillUnmount() {
        if (this.contentNode) {
          this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
        }
      }

      handleChange = (page, pageSize) => {
        this.fetch({page:page})
      }
    render(){
        const {articles, total} = this.state;
        return (<div >
            {
                articles.map(art => {
                   return  <ArticleSnapshot key={art.id} article={art} />
                })
            }
            <div className={styles["pagination"]}>
            <Pagination onChange={this.handleChange.bind(this)} defaultCurrent={1} total={total} />
            </div> 
        </div>
        )
    }
}

export default ArticlsList