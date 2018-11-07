import { Layout, Menu, Icon , Avatar} from 'antd';
import  styles from './SiderLayout.css';
const { Header, Sider, Content } = Layout;
import Link from 'umi/link';
import Breadcrumb from "./Breakcrumbs"
import * as account from "../../servies/account"

class SiderLayout extends React.Component {
 
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      user : {}
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentDidMount(){
    console.log("获取用户信息")
    account.me().then(res=>{
      console.log("me", res)
      if (res && res.data){
        this.setState({user: res.data})
      }
    })
  }
  render() {
    console.log(this.state, "stta")
    const {user} = this.state;
    return (
      <Layout className="adminLayout"  >
        <Header>
          <div className={styles["header"]}> 
            <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} src={user && user.avatar} >{user && user.username} </Avatar>
          </div>
        </Header>
      <Layout className="adminLayout" >
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles["logo"]} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="articles">
              <Icon type="file" />
              <span><Link to="/admin/articles">文章管理</Link></span>
            </Menu.Item>
            <Menu.Item key="category">
              <Icon type="hdd" />
              <span><Link to="/admin/category">分类管理</Link></span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="user" />
              <span><Link to="/admin/articles">账户管理</Link></span>
            </Menu.Item>
            <Menu.Item key="video">
              <Icon type="video-camera" />
              <span><Link to="/admin/videos">视频管理</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: "flex"}}>
            <Icon
              className={styles["trigger"]}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Breadcrumb></Breadcrumb>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
      </Layout>
    );
  }
}

export default SiderLayout;