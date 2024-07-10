import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const Protected = (props) => {
  const { Component } = props;
  const [isLogged, setLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem('token');

    if (!login) {
      navigate('/login');
      return;
    }
    setLogged(true);
  }, []);
  return (
    <>
      {isLogged ? <Component /> : <Login />}
    </>
  );
};
export default Protected;
