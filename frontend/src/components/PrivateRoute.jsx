import { Navigate } from 'react-router-dom';

import LocalStorageHelper from '../helpers/localstorage-helper';

function PrivateRoute({ children }) {
    return LocalStorageHelper.isAuthenticated()
        ? children
        : <Navigate to="/login" />;
}

export default PrivateRoute;
