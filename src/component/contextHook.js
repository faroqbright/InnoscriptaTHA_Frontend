import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [source, setSource] = useState('newsapi');
  const [api, setAPI] = useState('newsapi');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAutheticated] = useState(false)
  const baseURL = "http://appcrates.net/test_task_apis/public/api"
  const login = () => {
    setIsAutheticated(true)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setIsAutheticated(false)
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      login()
    }
  })
  return (
    <AuthContext.Provider value={{ api,setAPI,source,setSource,isLoading,setIsLoading,login,logout ,isAuthenticated,baseURL}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;