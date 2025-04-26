import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import React, { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useRouter } from 'src/routes/hooks';

import { useGetMeQuery } from 'src/store/reducers/users';
import { useLoginMutation, useRegisterMutation } from 'src/store/reducers/auth';

import Loader from 'src/components/scrollbar/Loader';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [login] = useLoginMutation();
  const {
    data: userData,
    refetch,
    isFetching,
    isLoading,
    status,
  } = useGetMeQuery({
    skip: !localStorage.getItem('authToken'),
  });
  const [register] = useRegisterMutation();

  const router = useRouter();

  const location = useLocation();

  useEffect(() => {
    // Check if there is no auth token, redirect immediately
    if (!localStorage.getItem('authToken') && !location.pathname.startsWith('/login')) {
      router.push('/login');
    }
  }, [router, location.pathname]);

  useEffect(() => {
    if (userData && status === 'fulfilled') {
      setUser(userData);
      setIsAuthenticated(true);

      if (userData.is_admin === 1) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.clear();
      }
    } else if (!isFetching && !isLoading) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
    }
  }, [userData, status, isFetching, isLoading]);

  const handleLogin = useCallback(
    async (credentials) => {
      setIsAuthenticated('loading');
      try {
        const { access_token } = await login(credentials).unwrap();
        localStorage.setItem('authToken', access_token);
        const { data: responseData } = await refetch();

        if (responseData?.is_admin === 1) {
          router.push('/');
        }
        return null;
      } catch (error) {
        console.error('Login failed:', error);
        setIsAuthenticated(false);
        localStorage.clear();
        return error;
      }
    },
    [login, refetch, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      localStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, [router]);

  const refreshAuthState = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleRegister = useCallback(
    async (credentials) => {
      try {
        await register(credentials).unwrap();
        const { access_token } = await login({
          username: credentials.email,
          password: credentials.password,
        }).unwrap();
        localStorage.setItem('authToken', access_token);

        const { data: responseData } = await refetch();
        if (responseData?.is_admin === 1) {
          setUser(responseData);
          setIsAuthenticated(true);
        }
        return null;
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        return error;
      }
    },
    [register, login, refetch]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login: handleLogin,
      logout: handleLogout,
      register: handleRegister,
      refreshAuthState,
    }),
    [isAuthenticated, user, handleLogin, handleLogout, handleRegister, refreshAuthState]
  );

  if (isFetching || isLoading) {
    return <Loader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
