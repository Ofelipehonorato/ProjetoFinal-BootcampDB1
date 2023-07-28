// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Table,
  Modal,
  Space,
} from "antd";
import LocalStorageHelper from '../helpers/localstorage-helper';
import axios from "axios";
// import {
//   BorderOutlined,
//   CheckOutlined,
//   DeleteOutlined,
//   FormOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Column } = Table;

function ListaAlunos() {
  // const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestAlunos = async () => {
    try {
      setLoading(true);
      
      const token = LocalStorageHelper.getToken();
    // Configure o cabeçalho 'Authorization' para incluir o token
    const config = {
      headers: {
        Authorization: 'Bearer '+token,
      },
    };

      const response = await axios.get("http://127.0.0.1:3000/alunos", config);

      const { data } = response;

      setAlunos(data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
          "Não foi possível carregar seus alunos, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAlunos();
  }, []);

    return (
      <Content>
        <br />
        <Space direction="vertical" style={{ display: "flex" }}>
          <Row justify="center">
            <Col span={23}>
              <Table
                dataSource={alunos}
                pagination
                loading={loading}
                rowKey={(aluno) => aluno.id}
              >
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Nome do aluno" dataIndex="nome" key="nome" />
                <Column title="Sexo" dataIndex="sexo" key="sexo" />
                <Column title="Idade" dataIndex="idade" key="idade" />
                <Column title="Altura" dataIndex="altura" key="altura" />
                <Column title="Peso" dataIndex="peso" key="peso" />
                <Column title="IMC" dataIndex="imc" key="imc" />
              </Table>
            </Col>
          </Row>
        </Space>
      </Content>
    );
  }

export default ListaAlunos;
