import styles from './index.css';
import SiderLayout from "./AdminLayout/SiderLayout"
import cookie from 'react-cookies'
import router from 'umi/router';
import Article from "./ArticleLayout/articleLayout"
import VideoLayou from "./VideoLayout/index"
function BasicLayout(props) {

  const url = props.location.pathname
  console.log(url.indexOf("/video"))
  if (url=="/"){
    router.push("/article")

  }else if (url.indexOf("/video") > -1 && url.indexOf("/video") < 2){
    return (
         <VideoLayou >
           {props.children}
         </VideoLayou>
    )
  }
  else if (url == "/admin") {
    router.push("/admin/articles")
  } else if (url.indexOf("/admin") > -1) {
    return (
         <SiderLayout>
          { props.children }
        </SiderLayout>
      );
  }else  if (url.indexOf("/article") > -1){
    return (
     <div className={styles.article}>
          <Article>
              { props.children }
           </Article>
            </div>
           )
  } 
  return (
    <div className={styles.login}>
       { props.children }
    </div>
    )
}

export default BasicLayout;
