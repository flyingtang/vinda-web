
import ArticleSnapshot from "./articleSnapshot"
import * as article  from "../../servies/article"

class ArticlsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page: 1,
            articles: []
        }
    }
    componentDidMount(){
        this.fetch(1)
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
          }
    }

    fetch = (page)=>{
        article.find().then(res=>{
            if (res && res.data){
                this.setState({articles: res.data})
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

    render(){
        const {articles} = this.state;
        return (<div ref={ node => this.contentNode = node }>
            {
                articles.map(art => {
                   return  <ArticleSnapshot key={art.id} article={art} />
                })
            }
        </div>
        )
    }
}

export default ArticlsList