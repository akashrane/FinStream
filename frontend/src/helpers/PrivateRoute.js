import keycloak from "../utils/kc";

const PrivateRoute = ({ children }) => {
 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default PrivateRoute;