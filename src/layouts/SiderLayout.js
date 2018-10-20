import { Layout, Menu, Icon } from 'antd';
import  styles from './SiderLayout.css';
const { Header, Sider, Content } = Layout;
import Link from 'umi/link';
import Breadcrumb from "./Breakcrumbs"

class SiderLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className="adminLayout" >
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="articles">
              <Icon type="user" />
              <span><Link to="/admin/articles">文章管理</Link></span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="video-camera" />
              <span><Link to="/admin/articles">账户管理</Link></span>
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
    );
  }
}

export default SiderLayout;