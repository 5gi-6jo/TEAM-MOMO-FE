// 회원가입 페이지 입력 체크
export const checkEmail = email => {
  if (email === '') {
    return { res: false, msg: '이메일을 입력해주세요' };
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return { res: false, msg: '올바른 이메일을 입력해주세요' };
  }
  return { res: true };
};

export const checkNickname = nickname => {
  if (nickname === '') {
    return { res: false, msg: '닉네임을 입력해주세요' };
  }
  return { res: true };
};

export const checkPW = (pw, pwCheck, nickname) => {
  if (pw === '') {
    return { res: false, msg: '비밀번호를 입력해주세요', focus: 'pwRef' };
  } else if (pwCheck === '') {
    return { res: false, msg: '비밀번호를 입력해주세요', focus: 'pwCheckRef' };
  } else if (!pw === pwCheck) {
    return {
      res: false,
      msg: '비밀번호를 올바르게 입력했는지 확인해주세요',
      focus: 'pwRef',
    };
  }
  return {
    res: true,
  };
};
