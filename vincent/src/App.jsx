import React from "react";
import { useState } from "react";
import { Layout, theme } from "antd";
import Nav from "@/layout/Nav";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [title, setTitle] = useState(null);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Sider breakpoint="lg" collapsedWidth="0" width={280}>
        <Nav />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 1rem",
            background: colorBgContainer,
          }}
        >
          <p style={{ fontSize: "2rem" }}>{title}</p>
        </Header>
        <Content
          style={{
            margin: "1.5rem 1rem 0",
            overflowY: "auto"
          }}
        >
          <div
            style={{
              padding: "1rem",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet context={setTitle} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Vincents ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
