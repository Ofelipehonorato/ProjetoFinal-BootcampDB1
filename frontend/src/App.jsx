/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CadastroAlunos from './pages/CadastroAlunos';
import ListaAlunos from './pages/ListaAlunos';
import CadastroProfessor from './pages/CadastroProfessor';
import Header from './components/nav/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
    <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<CadastroProfessor />} />
      <Route path="cadastroalunos" element={<CadastroAlunos />} />
      <Route path="alunos" element={<ListaAlunos />} />
    </Route>
  )
)

// eslint-disable-next-line no-unused-vars
function App({routes}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;