import styles from './index.css';
import SiderLayout from "./SiderLayout"


function BasicLayout(props) {
  
  if (props.location.pathname == "/login"){
    return (
    <div>
       loginLayout
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
