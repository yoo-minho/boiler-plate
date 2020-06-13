import React, {useState} from 'react'
import './NavBar.css'
import { Layout, Menu, Typography, Switch, Divider } from 'antd';
import { Link, withRouter, useHistory  } from 'react-router-dom' 
import {
  DesktopOutlined,
  PieChartOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  YoutubeFilled,
  LinkOutlined,
  createFromIconfontCN
} from '@ant-design/icons';


const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1883371_ng2qv2ds0zj.js'
  ],
});

function NavBar(props) {

    if(window.location.pathname === "/"){
        localStorage.setItem('menuKey','1');
    } else {
      //done
    }

    const getContent = props.content;

    const pathName = window.location.pathname.replace("/","");

    const headerTitle = pathName === "" ? "Home" : pathName;

    const menuClick = (key) => {
        localStorage.setItem('menuKey',key);
        let redirectUrl = '';
        if(key === '1'){
            redirectUrl = '/';
        } else if (key === '2'){
            redirectUrl = '/subscription';
        }
        props.history.push(redirectUrl);
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>

          <Sider theme="light" width="70">
            <Link to="/">
              <h1>
                <div id="logo">
                  <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                </div>
              </h1>
            </Link>
            <Menu
              defaultSelectedKeys={localStorage.getItem('menuKey')}
              defaultOpenKeys={['sub1']}
              mode='inline'
              theme='light'
            >
              <Menu.Item key="1" icon={<YoutubeFilled />} onClick={()=> menuClick('1')}></Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={()=> menuClick('2')}></Menu.Item>
              <Menu.Item key="3" icon={<IconFont type="icondingwei"/>} onClick={()=> props.history.push('/subscription')}></Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined/>} onClick={()=> props.history.push('/subscription')}></Menu.Item>
            </Menu>
          </Sider>
{/*
          <Sider theme="dark">
              <Link to="/">
                <h1>
                  <a id="logo">
                    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                    <span>PLATE</span></a>
                </h1>
              </Link>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode='inline'
                theme='dark'
              >
                <Menu.Item key="1" icon={<MailOutlined />}>
                  READ ME
                </Menu.Item>
                <Menu.Item key="2" icon={<MailOutlined />}>
                  VIDEO-WORLD
                </Menu.Item>
              </Menu>
              <Menu theme='dark' mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}><Link to="/">YOUTUBE</Link></Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}><Link to="/subscription">Subscription</Link></Menu.Item>
              </Menu>
</Sider>*/}

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

export default withRouter(NavBar)