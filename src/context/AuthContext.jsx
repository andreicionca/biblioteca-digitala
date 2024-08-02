import PropTypes from 'prop-types';
import { AuthContext, useAuthProvider } from './auth';

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
