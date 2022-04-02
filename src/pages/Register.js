import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Headerbar from '../shared/Headerbar';

const Register = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      //modal
      navigate('/', { replace: true });
    }
  });

  return (
    <React.Fragment>
      <Headerbar
        text="회원가입"
        _onClickClose={() => {
          navigate('/Login', { replace: true });
        }}
      />
      <RegisterForm />
    </React.Fragment>
  );
};

export default Register;
