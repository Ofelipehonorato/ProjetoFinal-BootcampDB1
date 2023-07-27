/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import {
    Button, Card,
    Col, Form, Layout, Row,
    Typography, Modal,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Background from '../assets/gymblur.jpg';
import Logo from '../assets/perde-peso-logo.png';
import InputText from '../components/InputText';
import {
    validateEmail, validateName, validatePassword, validateProfId,
} from '../validatiors/usuarios';

const { Content } = Layout;
const { Title } = Typography;

function SubscriptionPage() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({});

    const [loading, setLoading] = useState(false);

    const handleSubscription = useCallback(async () => {
        try {
            setLoading(true);

            const {
                nome, email, senha, profId,
            } = formValues;

            if (!nome?.valid || !email?.valid || !senha?.valid) return;

            const body = {
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                profId: profId.value,

            };

            await axios.post('/usuarios', body);

            Modal.success({
                title: 'Cadastro realizado com sucesso!',
            });

            navigate('/login');
        } catch (error) {
            console.warn(error);
            const { response } = error;
            if (response && response.status === 422) {
                Modal.error({
                    title: 'E-mail já cadastrado no banco de dados.',
                });
            } else {
                Modal.error({
                    title: 'Ooopps, não foi possível cadastrar o usuário no momento.',
                });
            }
        } finally {
            setLoading(false);
        }
    }, [formValues, navigate]);

    const handleInputChange = useCallback((event) => {
        const { name, input } = event;

        setFormValues({
            ...formValues,
            [name]: input,
        });
    }, [formValues]);

    return (
        <Content
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
            }}
        >

            <Row
                justify="center"
            >
                <Col xs={24} sm={14} md={12} lg={10} xl={8}>
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
                            Cadastre-se
                        </Title>

                        <Form layout="vertical">
                            <InputText
                                name="nome"
                                label="Nome"
                                size="large"
                                onChange={handleInputChange}
                                validate={validateName}
                                disabled={loading}
                                required
                                value={formValues.nome?.value}
                            />

                            <InputText
                                name="email"
                                label="E-mail"
                                size="large"
                                onChange={handleInputChange}
                                validate={validateEmail}
                                disabled={loading}
                                required
                                value={formValues.email?.value}
                            />

                            <InputText
                                name="senha"
                                label="Senha"
                                type="password"
                                size="large"
                                onChange={handleInputChange}
                                validate={validatePassword}
                                disabled={loading}
                                autoComplete="new-password"
                                required
                                value={formValues.senha?.value}
                            />

                            <InputText
                                name="profId"
                                label="Código Professor"
                                size="large"
                                onChange={handleInputChange}
                                validate={validateProfId}
                                disabled={loading}
                                required
                                value={formValues.profId?.value}
                            />
                            <Button
                                block
                                type="primary"
                                size="large"
                                onClick={handleSubscription}
                                loading={loading}
                            >
                                Cadastrar
                            </Button>
                        </Form>

                        <br />

                        <Typography.Text>
                            Voltar para o
                            {' '}
                            <Link
                                to="/login"
                                className="ant-btn ant-btn-link ant-btn-lg ant-btn-block"
                            >
                                Login
                            </Link>
                        </Typography.Text>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default SubscriptionPage;
