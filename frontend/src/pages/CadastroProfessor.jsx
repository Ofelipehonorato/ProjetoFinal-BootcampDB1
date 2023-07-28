// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import axios from 'axios';

import { Form, Link, useNavigate } from "react-router-dom";
import InputText from '../components/InputText';
import LocalStorageHelper from '../helpers/localstorage-helper';
import { validateEmail, validateName, validatePassword } from '../validators/usuarios';
import { Button, Card, Col, Row, Layout, Typography, Modal } from "antd";
import Logo from "../assets/perde-peso-logo.png";
import Background from "../assets/gymblur.jpg";

const { Content } = Layout;
const { Title } = Typography;

const CadastroProfessor = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nome: '',
    codigo_cref: '',
    email: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    try {
      setLoading(true);

      const { nome, codigo_cref, email, senha } = formValues;

      if (!nome?.valid ||!email?.valid || !senha?.valid) {
        Modal.error({
          title: "Preencha todos os campos obrigatórios",
        });
        setLoading(false);
        return;
      }

      if (!email.valid || !senha.valid) {
        Modal.error({
          title: "Preencha corretamente o campo de email e senha!",
        });
        setLoading(false);
        return;
      }

      const body = {
        nome,
        email,
        senha,
      };

      if (codigo_cref) {
        body.codigo_cref = codigo_cref;
      }

      const response = await axios.post(
        'http://127.0.0.1:3000/professor',
        body
      );

      const { token } = response.data;

      LocalStorageHelper.setToken(token);

      axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
      
      navigate('/alunos');
    } catch (error) {
      console.warn(error);
      if (error?.response?.data?.message) {
        Modal.error({
          title: error.response.data.message,
        });
      } else {
        Modal.error({
          title:
            "Não foi possível cadastrar o professor no momento, tente novamente mais tarde.",
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
                Faça cadastro para continuar
              </Title>

              <div>
                <Form layout="vertical">

                <InputText
                name="nome"
                label="Nome"
                size="large"
                validate={validateName}
                onChange={handleInputChange}
                required
                disabled={loading}
                value={formValues.nome?.value}
              />

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
                name="codigo_cref"
                label="CREF"
                size="large"
                required
                disabled={loading}
                value={formValues.codigo_cref?.value}
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

            </Form>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Link to="/register">
                  <Button 
                    type="primary" 
                    style={{ marginLeft: "10px" }}
                    onClick={handleCadastro}
                    loading={loading}>
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

export default CadastroProfessor;
