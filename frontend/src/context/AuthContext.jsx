import { createContext, useContext, useEffect, useState } from "react";
import authService from "../pages/auth/authService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(authService.getToken());
  const [user, setUser] = useState(authService.getUser());
const [errorStatus,setErrorStatus] = useState(null)

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res;
  };
  const register = async (data) => {
    const res = await authService.register(data);
    if (res.success) {
      console.log(res);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res;
  };
  const logout = async (navigate) => {
    await authService.logout(navigate);
    location.reload();
    setToken(null);
    setUser(null);
  };
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (authService.isAuthenticated()) {
//         try {
//           const profile = await authService.getProfile();
//           if (profile) {
//             setUser(profile);
//           }
//         } catch (e) {
//             if(!e.response){
//                 setErrorStatus(500)
//             }
//         }

        
//       }
//     };
//     fetchProfile();
//   }, []);
 

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
    register,
    errorStatus
  };
  //localStorage.removeItem('access_token')
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
