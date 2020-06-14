import React from 'react'
import './NavBar.css'
import { Layout, Menu, Typography, PageHeader } from 'antd';
import { Link, withRouter } from 'react-router-dom' 
import {
  VideoCameraOutlined,
  YoutubeFilled,
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

    const getContent = props.content;

    const pathName = window.location.pathname.replace("/","");

    const headerTitle = pathName === "" ? "Home" : pathName;

    const menuClick = (e) => {
        localStorage.setItem('menuKey', e.key);
        props.history.push(e.item.props.link);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>

          <Sider theme="light" width="200">
            <Link to="/">
              <h1>
                <div id="logo">
                  <img alt="logo" src="//lh6.googleusercontent.com/-VZcrkhIIQZE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckibbvkRZJPYnB6okBxGNqPEQNR1g/s88-c-k-c0x00ffffff-no-rj-mo/photo.jpg"/>
                </div>
              </h1>
            </Link>
            <Menu
              defaultSelectedKeys={localStorage.getItem('menuKey') ? localStorage.getItem('menuKey') : '1'}
              mode='inline'
              theme='light'
            >
              <SubMenu key="sub1" icon={<YoutubeFilled />} title="유튜브사이트">
                <Menu.Item key="1" link="/" onClick={menuClick} title="홈">홈</Menu.Item>
                <Menu.Item key="2" link="/subscription" onClick={menuClick}>구독</Menu.Item>
                <Menu.Item key="3" link="/video/upload" onClick={menuClick}>업로드</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<VideoCameraOutlined />} title="영화사이트">
                <Menu.Item key="4" link="/movie" onClick={menuClick} title="홈">홈</Menu.Item>
                <Menu.Item key="5" link="/favorite" onClick={menuClick}>즐겨찾기</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="Title"
              subTitle={headerTitle}
            />
            <Content style={{ margin: '0 16px' }}>
              {getContent}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>

        </Layout>
    )
}

export default withRouter(NavBar)