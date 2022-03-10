import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onNicknameHandler = e => {
    setNickname(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordCheckHandler = e => {
    setPasswordCheck(e.currentTarget.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="test" value={nickname} onChange={onNicknameHandler} />

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>ConfirmPasword</label>
        <input
          type="password"
          value={passwordCheck}
          onChange={onPasswordCheckHandler}
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(Register);
