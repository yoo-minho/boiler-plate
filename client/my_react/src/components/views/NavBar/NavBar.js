import React from 'react'
import './NavBar.css'
import { Layout, Menu, Typography, PageHeader, Avatar, Row, Col, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom' 
import {
  VideoCameraOutlined,
  YoutubeFilled,
  ReadOutlined,
  UserOutlined,
  createFromIconfontCN
} from '@ant-design/icons';


const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1883371_ll8x609dn1l.js'
  ],
});

function NavBar(props) {

    if(window.location.pathname === '/login' ||  window.location.pathname === '/register'){
        localStorage.setItem('showSideYn', 'N');
    } else {
        localStorage.setItem('showSideYn', 'Y');
    }

    const getContent = props.content;

    const pathName = window.location.pathname.replace("/","");

    const headerTitle = pathName === "" ? "Home" : pathName;

    const menuClick = (e) => {
        localStorage.setItem('menuKey', e.key);
        forwordUrl(e);
    }

    const signClick = (e) => {
        localStorage.setItem('showSideYn', 'N');
        forwordUrl(e);
    }

    const forwordUrl = (e) => {
        if(e.item){
          console.log(e.item.props.openKeys)
          localStorage.setItem('defaultOpenKeys', e.item.props.openKeys);
        } else {
          //done
        }
        let returnUrl = e.item ? e.item.props.link : e.currentTarget ? e.currentTarget.getAttribute("link") :"/";
        props.history.push(returnUrl);
    }

    const onClick2 = () => {
      console.log(111);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>

          {
            (localStorage.getItem('showSideYn') === 'Y') &&
            <Sider theme="light" width="200">
              <div className="logo" />
              <Menu
                defaultSelectedKeys={localStorage.getItem('menuKey') ? localStorage.getItem('menuKey') : '1'}
                defaultOpenKeys={localStorage.getItem('defaultOpenKeys') ? localStorage.getItem('defaultOpenKeys').split(',') : ''}
                mode='inline'
                theme='light'
              >
                <Menu.Item key="0" link="/readme" icon={<ReadOutlined />} onClick={menuClick}>READ ME</Menu.Item>
                <SubMenu key="sub1" icon={<YoutubeFilled />} title="영상업로드서비스" onClick={onClick2}>
                  <Menu.Item key="1" link="/" onClick={menuClick} title="홈">홈</Menu.Item>
                  <Menu.Item key="2" link="/subscription" onClick={menuClick}>구독</Menu.Item>
                  <Menu.Item key="3" link="/video/upload" onClick={menuClick}>업로드</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<VideoCameraOutlined />} title="영화조회서비스">
                  <Menu.Item key="4" link="/movie" onClick={menuClick} title="홈">홈</Menu.Item>
                  <Menu.Item key="5" link="/favorite" onClick={menuClick}>즐겨찾기</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<VideoCameraOutlined />} title="채팅서비스">
                  <Menu.Item key="6" link="/chat" onClick={menuClick} title="홈">홈</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<VideoCameraOutlined />} title="투두서비스">
                  <Menu.Item key="7" link="/todo" onClick={menuClick} title="홈">홈</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          }

          <Layout className="site-layout">

            <Row>
              <Col span={18}>
                <PageHeader
                  className="site-page-header"
                  title={headerTitle}
                  subTitle={headerTitle}
                />
              </Col>
              <Col span={6} className="login-group">
                <Button key="1" link="/register" className="signin" size={'default'} onClick={signClick}> 회원가입</Button>
                <Button key="2" link="/login"  className="login" size={'default'} onClick={signClick}>로그인</Button>
              </Col>
            </Row>

            <Content style={{ margin: '0 16px' }}>
              {getContent}
            </Content>

            <Footer style={{ textAlign: 'center' }}>Yoo Design ©2020 Created by Yoominho</Footer>

          </Layout>

        </Layout>
    )
}

export default withRouter(NavBar)