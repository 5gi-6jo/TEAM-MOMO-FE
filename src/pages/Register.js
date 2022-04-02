import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Headerbar from '../shared/Headerbar';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Register = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      //modal
      navigate('/main', { replace: true });
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

// styled components 작성 위치

// default props 작성 위치
Register.defaultProps = {};

export default Register;
