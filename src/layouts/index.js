import styles from './index.css';
import SiderLayout from "./AdminLayout/SiderLayout"
import cookie from 'react-cookies'
import router from 'umi/router';
import Article from "./ArticleLayout/articleLayout"
function BasicLayout(props) {
  const url = props.location.pathname
 if (url.indexOf("/admin") > -1) {
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
