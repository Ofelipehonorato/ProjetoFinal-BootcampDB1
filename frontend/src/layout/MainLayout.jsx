/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { Suspense, lazy } from 'react';
import {
    Routes, Route, Navigate,
} from 'react-router-dom';

/**
 * Arquivos importadas utilizando a técnica de lazy/Suspense do React.
 * Docs: https://pt-br.react.dev/reference/react/Suspense
 *
 * Isso permite que os arquivos sejam carregados apenas quando as páginas foram acessadas
 * pelo usuário.
 */
const PrivateRoute = lazy(() => import('../components/PrivateRoute'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SubscriptionPage = lazy(() => import('../pages/SubscriptionPage'));
const TaskCreatePage = lazy(() => import('../pages/TaskCreatePage'));
const TaskListPage = lazy(() => import('../pages/TaskListPage'));
const AppLayout = lazy(() => import('./AppLayout'));

function MainLayout() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Navigate to="/tasks" />} />
                <Route
                    path="/tasks"
                    element={(
                        <PrivateRoute>
                            <AppLayout>
                                <TaskListPage />
                            </AppLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/tasks/new"
                    element={(
                        <PrivateRoute>
                            <AppLayout>
                                <TaskCreatePage />
                            </AppLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/tasks/:taskId"
                    element={(
                        <PrivateRoute>
                            <AppLayout>
                                <TaskCreatePage />
                            </AppLayout>
                        </PrivateRoute>
                    )}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
            </Routes>
        </Suspense>
    );
}

export default MainLayout;
