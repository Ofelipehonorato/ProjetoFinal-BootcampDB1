// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "antd";
import Logo from "../assets/perde-peso-logo.png";
import { Content } from "antd/es/layout/layout";
import Background from "../assets/gymblur.jpg";

const Home = () => {
  return (
    <Content
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Row justify="center">
        <Col xs={24} sl={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>
            <div style={{ textAlign: "center" }}>
              <img src={Logo} alt="Logo" style={{ maxWidth: "80%" }} />

              <div style={{ marginTop: "20px" }}>
                <Link to="/login">
                  <Button type="primary">Já tenho cadastro</Button>
                </Link>
                <Link to="/register">
                  <Button type="primary" style={{ marginLeft: "10px" }}>
                    Realizar cadastro
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Home;
