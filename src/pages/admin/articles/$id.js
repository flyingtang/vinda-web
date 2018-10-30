import NEArticle from "./newedit"
export default function NewArticle(props){

    const id = props.match.params && props.match.params.id;
    if (id) {
        return  <NEArticle id={id} />
    }else{
        return <div>无效的ID</div>
    }
}