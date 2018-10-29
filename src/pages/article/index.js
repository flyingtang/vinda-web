
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
    }

    fetch = (page)=>{
        article.find().then(res=>{
            if (res && res.data){
                this.setState({articles: res.data})
            }
        })
    }
    render(){
        const {articles} = this.state;
        return (<div>
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