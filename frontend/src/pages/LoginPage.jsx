/* eslint-disable linebreak-style */
import {
  Button, Card,
  Col, Form, Layout, Row,
  Typography, Modal,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Logo from '../assets/perde-peso-logo.png';
import InputText from '../components/InputText';
import LocalStorageHelper from '../helpers/localstorage-helper';
import { validateEmail, validatePassword } from '../validatiors/usuarios';
import Background from '../assets/gymblur.jpg';

const { Content } = Layout;
const { Title } = Typography;

function LoginPage() {
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

      const response = await axios.post('/usuarios/login', body);

      const { token } = response.data;

      LocalStorageHelper.setToken(token);

      navigate('/tasks');
    } catch (error) {
      console.warn(error);
      const { response } = error;
      if (response?.status === 401) {
        Modal.error({
          title: 'Usuário ou senha inválidos',
        });
      } else {
        Modal.error({
          title: 'Não foi possível entrar no momento, tente novamente mais tarde.',
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Row
        justify="center"
      >
        <Col xs={24} sl={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>

            <div style={{ textAlign: 'center' }}>
              <img
                src={Logo}
                alt="Logotipo"
                style={{ maxWidth: '80%' }}
              />
            </div>

            <Title
              level={3}
              type="secondary"
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              Faça login para continuar
            </Title>

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

            <br />

            <Typography.Text>
              Então não possui conta?
              {' '}
              <Link
                to="/subscription"
                className="ant-btn ant-btn-link ant-btn-lg ant-btn-block"
              >
                Cadastre-se
              </Link>
            </Typography.Text>

          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default LoginPage;
