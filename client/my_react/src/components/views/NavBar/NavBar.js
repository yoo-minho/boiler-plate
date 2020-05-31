import React from 'react'
import { Layout, Menu, Typography } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import logo from '../../../img/pngguru.com.png'

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

function NavBar(props) {

    const getContent = props.content;

    const state = {
        collapsed: false,
      };

    const onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

    const pathName = window.location.pathname.replace("/","");

    const headerTitle = pathName === "" ? "Home" : pathName;
      

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <div className="logo" onClick={function(){window.location.href="/"}}>
            <img style={{ height:'60px', marginLeft:'20px'}} src={logo}/>
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={function(){window.location.href="/"}}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={function(){window.location.href="/subscription"}}>
              Subscription
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
        <Title level={2} style={{color:'white', lineHeight:2}}>{headerTitle}</Title>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {getContent}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
}

export default NavBar