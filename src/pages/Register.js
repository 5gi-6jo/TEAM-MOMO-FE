import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm';

const Register = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      alert('이미 로그인이 되어있습니다.');
      navigate('/', { replace: true });
    }
  });

  return (
    <>
      <Title>회원가입</Title>
      <RegisterForm />
    </>
  );
};

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1em 0;
`;

export default Register;
