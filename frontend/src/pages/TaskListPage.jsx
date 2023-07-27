/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Table,
  Modal,
  Button,
  Space,
  Popconfirm,
} from 'antd';
import axios from 'axios';
import {
  BorderOutlined,
  CheckOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Column } = Table;

function TaskListPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestTasks = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/tarefas');

      const { data } = response;

      setTasks(data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
                    'Não foi possível carregar suas tarefas, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestTasks();
  }, []);

  const completeTask = async (taskId, concluida) => {
    try {
      setLoading(true);

      let response;
      if (concluida) {
        response = await axios.put(`/tarefas/${taskId}/concluida`);
      } else {
        response = await axios.put(`/tarefas/${taskId}/pendente`);
      }

      const { data } = response; // recebe a tarefa atualizada do backend

      const novoTarefas = [...tasks]; // copia o array de tarefas
      const index = novoTarefas.findIndex((tarefa) => tarefa.id === taskId); // encontra o index

      novoTarefas.splice(index, 1, data); // substitui a tarefa antiga pela atualizada

      setTasks(novoTarefas); // atualiza o estado
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (taskId) => {
    try {
      setLoading(true);

      await axios.delete(`/tarefas/${taskId}`);

      const novoTarefas = [...tasks];
      const index = novoTarefas.findIndex((tarefa) => tarefa.id === taskId);

      novoTarefas.splice(index, 1);

      setTasks(novoTarefas);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCompletedTask = (concluida, task) => (
    <Button
      onClick={() => {
        completeTask(task.id, !concluida);
      }}
      icon={concluida ? <CheckOutlined /> : <BorderOutlined />}
    />
  );

  const renderActions = (task) => (
    <Button.Group>
      <Button
        onClick={() => {
          navigate(`/tasks/${task.id}`);
        }}
        icon={<FormOutlined />}
      />
      <Popconfirm
        title="Deseja excluir a tarefa?"
        okText="Sim, excluir"
        cancelText="Não, cancelar"
        onConfirm={() => {
          removeTask(task.id);
        }}
      >
        <Button icon={<DeleteOutlined />} />
      </Popconfirm>
    </Button.Group>
  );

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Row justify="center">
          <Col span={23}>
            <Table
              dataSource={tasks}
              pagination
              loading={loading}
              rowKey={(task) => task.id}
            >
              <Column title="ID" dataIndex="id" key="id" />
              <Column title="Título" dataIndex="titulo" key="titulo" />
              <Column
                title="Criada em"
                dataIndex="criado_em"
                key="criado_em"
                render={(data) => new Date(data).toLocaleString()}
              />
              <Column
                title="Atualizada em"
                dataIndex="atualizado_em"
                key="atualizado_em"
                render={(data) => new Date(data).toLocaleString()}
              />
              <Column
                title="Concluída"
                dataIndex="concluida"
                key="concluida"
                render={renderCompletedTask}
              />
              <Column title="Ações" key="acoes" render={renderActions} />
            </Table>
          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default TaskListPage;
