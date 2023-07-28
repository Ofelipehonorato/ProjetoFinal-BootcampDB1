/* eslint-disable linebreak-style */
import {
  Button,
  Col, Form, Modal, notification, Row, Space,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InputText from '../components/InputText';
import { validateTaskTitle } from '../validatiors/tarefas';

function TaskCreatePage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  }, [formValues]);

  const requestTask = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/tarefas/${taskId}`);

      const { data } = response;

      setFormValues({
        titulo: {
          value: data.titulo,
          valid: true,
        },
      });
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar a tarefa, tente novamente mais tarde.',
      });
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  }, [taskId, navigate]);

  useEffect(() => {
    if (taskId) {
      requestTask();
    } else {
      setFormValues({});
    }
  }, [requestTask, taskId]);

  const handleCreateTask = useCallback(async () => {
    try {
      setLoading(true);

      const { titulo } = formValues;

      if (!titulo?.valid) return;

      const body = {
        titulo: titulo.value,
      };

      if (taskId) {
        await axios.patch(`/tarefas/${taskId}`, body);
      } else {
        await axios.post('/tarefas', body);
      }

      notification.success({
        message: 'Tarefa salva com sucesso!',
      });

      navigate('/tasks');
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi cadastrar-se, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate, taskId]);

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col xs={23} sl={14} md={12} lg={10} xl={8}>

            <Form layout="vertical">
              <InputText
                name="titulo"
                label="Título da tarefa"
                size="large"
                onChange={handleInputChange}
                validate={validateTaskTitle}
                disabled={loading}
                required
                value={formValues.titulo?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleCreateTask}
                loading={loading}
              >
                Salvar
              </Button>
            </Form>

          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default TaskCreatePage;
