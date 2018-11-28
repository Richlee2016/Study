import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Link from 'umi/link'
import styles from './zstyle.less'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const App = props => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={false}
      >
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <SubMenu
            key='1'
            title={<span><Icon type='desktop' /><span>电影</span></span>}
          >
            <Menu.Item key='11'><Link to={'/movie'}>家园</Link></Menu.Item>
            <Menu.Item key='12'><Link to={'/movie/group'}>分组</Link></Menu.Item>
            <Menu.Item key='13'><Link to={'/movie/hot'}>最热</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key='2'
            title={<span><Icon type='user' /><span>用户</span></span>}
          >
            <Menu.Item key='21'><Link to={'/user'}>qq关联用户</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key='3'>
            <Icon type='file' />
            <span><Link className={styles.good} to={'/page'}>页面</Link></span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
