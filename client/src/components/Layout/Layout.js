import React from 'react';
import Layout from 'antd/es/layout';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import { FileAddOutlined } from '@ant-design/icons';
import './Layout.css';
import { Link } from 'react-router-dom';
import logo from '../../logo1.png';

const { Header, Content, Footer } = Layout;

const LayoutComponent = ({ children }) => (
  <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row>
        <Col span={18}>
          <Link className="link-font" to="/">
            <img
              alt="logo"
              src={logo}
              style={{ width: '3rem', height: '3rem' }}
            />
            &nbsp;&nbsp; Assem&apos;s Blogs
          </Link>
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            size="large"
            icon={<FileAddOutlined />}
            style={{ padding: '0 3rem' }}
            href="/createBlog"
            shape="round"
          >
            Create New Blog
          </Button>
        </Col>
      </Row>
    </Header>
    <Content
      className="site-layout"
      style={{ padding: '0 50px', marginTop: 85 }}
    >
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          overflow: 'initial',
        }}
      >
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Made with 😍 by Mohamed Assem
    </Footer>
  </Layout>
);

export default LayoutComponent;
