import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useRouter } from 'src/routes/hooks';

import { useGetMeQuery } from 'src/store/reducers/users';
import { useLoginMutation, useRegisterMutation } from 'src/store/reducers/auth';

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
  } = useGetMeQuery(null, {
    skip: isAuthenticated || !localStorage.getItem('authToken'),
  });
  const [register] = useRegisterMutation();

  const router = useRouter();

  useEffect(() => {
    // Check if there is no auth token, redirect immediately
    if (!localStorage.getItem('authToken')) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // If still fetching or loading, do not perform any redirection yet
    if (isFetching || isLoading) {
      return;
    }

    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
      if (userData?.is_admin === 1) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        router.push('/login');
        localStorage.clear();
      }
    } else if (status === 'rejected') {
      setIsAuthenticated(false);
      setUser(null);
      router.push('/login');
      localStorage.clear();
    }
  }, [userData, isFetching, isLoading, router, status]);

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        const { access_token } = await login(credentials).unwrap();
        localStorage.setItem('authToken', access_token);
        setIsAuthenticated(true);
        return null;
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        return error;
      }
    },
    [login]
  );

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem('authToken');
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
        const { data } = await refetch();
        setUser(() => data);
        setIsAuthenticated(true);
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
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
