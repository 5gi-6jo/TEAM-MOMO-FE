import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Rect10 } from '../img';
import theme from '../Styles/theme';
import { HiOutlineChevronRight } from 'react-icons/hi';

const Agreement = props => {
  const [checkBox, setCheckBox] = useState([]);
  const isAllChecked = checkBox.length === 3;
  console.log(isAllChecked);
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
    <React.Fragment>
      <MainWrap>
        <Grid padding="10px">
          <EachCheckWrap>
            <input type="checkbox" id="checkAll" />
            <label id="checkAll" htmlFor="checkAll">
              <Text color={theme.color.black} size="16px" bold>
                전체 약관 동의
              </Text>
            </label>
          </EachCheckWrap>
          <Rect src={Rect10} />
          <CheckWrap>
            <EachCheckWrap>
              <input
                type="checkbox"
                id="check1"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check1');
                }}
                checked={checkBox.includes('check1') ? true : false}
              ></input>
              <label id="check1" htmlFor="check1">
                <Text color={theme.color.gray1} size="12px">
                  회원가입 및 운영약관 동의 (필수)
                </Text>
              </label>
              <Icon
                onClick={() => {
                  //modal
                }}
              >
                <HiOutlineChevronRight className="right" />
              </Icon>
            </EachCheckWrap>
            <EachCheckWrap>
              <input
                type="checkbox"
                id="check2"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check2');
                }}
                checked={checkBox.includes('check2') ? true : false}
              ></input>
              <label id="check2" htmlFor="check2">
                <Text color={theme.color.gray1} size="12px">
                  개인정보 수집 및 이용 동의 (필수)
                </Text>
              </label>
              <Icon
                onClick={() => {
                  //modal
                }}
              >
                <HiOutlineChevronRight className="right" />
              </Icon>
            </EachCheckWrap>
            <EachCheckWrap>
              <input
                type="checkbox"
                id="check3"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check3');
                }}
                checked={checkBox.includes('check3') ? true : false}
              ></input>
              <label id="check3" htmlFor="check3">
                <Text color={theme.color.gray1} size="12px">
                  위치정보 이용약관 동의 (필수)
                </Text>
              </label>
              <Icon
                onClick={() => {
                  //modal
                }}
              >
                <HiOutlineChevronRight className="right" />
              </Icon>
            </EachCheckWrap>
          </CheckWrap>
        </Grid>
      </MainWrap>
    </React.Fragment>
  );
};

const MainWrap = styled.div`
  position: relative;
`;
const CheckWrap = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
`;
const EachCheckWrap = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;
const Icon = styled.div`
  position: relative;
  .right {
  }
`;

const Rect = styled.img``;

export default Agreement;
