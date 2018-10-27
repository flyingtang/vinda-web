import styles from './index.css';
import SiderLayout from "./SiderLayout"
import cookie from 'react-cookies'
import router from 'umi/router';

function BasicLayout(props) {
  if (props.location.pathname == "/login"){
    return (
    <div className={styles.login}>
       { props.children }
    </div>)
  }
  return (
     <SiderLayout>
      { props.children }
    </SiderLayout>

  );
}

export default BasicLayout;
