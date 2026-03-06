import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { sitebarMenu } from './utils/sidebarMenuData';
import { Route, Router, Routes } from 'react-router';
import { routes } from './utils/Routes';
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed}>
    <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['1']}
    items={sitebarMenu}
    />
    </Sider>
    <Layout>
    <Header style={{ padding: 0, background: colorBgContainer }}>
    <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: '16px',
      width: 64,
      height: 64,
    }}
    />
    </Header>
    <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}
    >
    <Routes>
    {
      routes.map(item => (
        <Route path={item.path} element={item.element} key={item.id} />
      ))
    }
    </Routes>
    </Content>
    </Layout>
    </Layout>
  );
};
export default App;