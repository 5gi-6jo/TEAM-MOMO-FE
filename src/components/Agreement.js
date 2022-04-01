import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Rect10 } from '../img';
import theme from '../Styles/theme';

const Agreement = props => {
  const [checkBox, setCheckBox] = useState([]);
  const isAllChecked = checkBox.length === 3;
  useEffect(() => {
    props.setChecked(isAllChecked);
  });

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckBox([...checkBox, id]);
      console.log('체크 반영 완료');
    } else {
      setCheckBox(checkBox.filter(button => button !== id));
      console.log('체크 해제 반영 완료');
    }
  };

  return (
    <>
      <MainWrap>
        <Grid padding="20px 0px 0px 20px">
          <Rect src={Rect10} />
          <CheckWrap>
            <Grid is_flex padding="20px 0px 0px 40px">
              <input
                type="checkbox"
                id="check1"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check1');
                }}
                checked={checkBox.includes('check1') ? true : false}
              ></input>
              <label id="check1" htmlFor="check1"></label>
              <Text color={theme.color.gray1} size="11px">
                회원가입 및 운영약관 동의 (필수)
              </Text>
            </Grid>
            <Grid is_flex padding="20px 0px 0px 40px">
              <input
                type="checkbox"
                id="check2"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check2');
                }}
                checked={checkBox.includes('check2') ? true : false}
              ></input>
              <label id="check2" htmlFor="check2"></label>
              <Text color={theme.color.gray1} size="11px">
                개인정보 수집 및 이용 동의 (필수)
              </Text>
            </Grid>
            <Grid is_flex padding="20px 0px 0px 40px">
              <input
                type="checkbox"
                id="check3"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check3');
                }}
                checked={checkBox.includes('check3') ? true : false}
              ></input>
              <label id="check3" htmlFor="check3"></label>
              <Text color={theme.color.gray1} size="11px">
                위치정보 이용약관 동의 (필수)
              </Text>
            </Grid>
          </CheckWrap>
        </Grid>
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  position: relative;
`;
const CheckWrap = styled.div`
  position: absolute;
  top: 15%;
  left: 0%;
`;

const Rect = styled.img``;

export default Agreement;
