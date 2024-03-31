/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import authService from "@/services/authService";

interface User {
  userId: string;
  email: string;
  groups: string[];
}

interface IAuthContext {
  userInfo: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  setUpAccess: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }

  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const setUpAccess = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = await authService.decodeToken();

        setUserInfo({
          userId: decoded.user,
          email: decoded.email,
          groups: decoded.groups,
        });

        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [])
  
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);

      localStorage.setItem("token", response.access_token);
      
      await setUpAccess()
    } catch (error) {
      throw error
    }
  }, [])
  
  useEffect(() => {
    setUpAccess()
  }, [])

  const contextValue = useMemo(
    () => ({
      userInfo,
      isAuthenticated,
      isLoading,
      login,
      setUpAccess
    }),
    [userInfo, isAuthenticated, isLoading, login],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
