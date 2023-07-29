// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import axios from 'axios';

import { Form, Link, useNavigate } from "react-router-dom";
import InputText from '../components/InputText';
import LocalStorageHelper from '../helpers/localstorage-helper';
import { validateEmail, validatePassword } from '../validators/usuarios';
import { Button, Card, Col, Row, Layout, Typography, Modal } from "antd";
import Logo from "../assets/perde-peso-logo.png";
import Background from "../assets/gymblur.jpg";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { email, senha } = formValues;

      if (!email?.valid || !senha?.valid) return;

      const body = {
        email: email.value,
        senha: senha.value,
      };

      const response = await axios.post(
        'http://127.0.0.1:3000/professor/login',
        body
      );

      const { token } = response.data;

      LocalStorageHelper.setToken(token);

      axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
      
      navigate('/alunos');
    } catch (error) {
      console.warn(error);
      const { response } = error;
      if (response?.status === 401) {
        Modal.error({
          title: "Usuário ou senha inválidos",
        });
      } else {
        Modal.error({
          title:
            "Não foi possível entrar no momento, tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  };

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
            <div 
              style={{ textAlign: "center" }}
            >
              <img 
                src={Logo} 
                alt="Logo" 
                style={{ maxWidth: "80%" }} 
              />

              <Title
                level={3}
                type="secondary"
                style={{ textAlign: "center", marginTop: 8 }}
              >
                Faça login para continuar
              </Title>

              <div>
                <Form layout="vertical">
              <InputText
                name="email"
                label="E-mail"
                size="large"
                validate={validateEmail}
                onChange={handleInputChange}
                required
                disabled={loading}
                value={formValues.email?.value}
              />

              <InputText
                name="senha"
                label="Senha"
                size="large"
                validate={validatePassword}
                required
                type="password"
                onChange={handleInputChange}
                disabled={loading}
                value={formValues.senha?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleLogin}
                loading={loading}
              >
                Entrar
              </Button>
            </Form>
              </div>

              <div style={{ marginTop: "20px" }}>
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

export default Login;
