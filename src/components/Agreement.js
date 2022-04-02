import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Rect10 } from '../img';
import theme from '../Styles/theme';
import { HiOutlineChevronRight } from 'react-icons/hi';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Agreement = props => {
  const [checkBox, setCheckBox] = useState([]);
  const isAllChecked = checkBox.length === 3;
  useEffect(() => {
    props.setChecked(isAllChecked);
  });

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckBox([...checkBox, id]);
    } else {
      setCheckBox(checkBox.filter(x => x !== id));
    }
  };

  return (
    <React.Fragment>
      <MainWrap>
        <EachCheckWrap>
          <input type="checkbox" id="checkAll" />
          <label id="checkAll" htmlFor="checkAll">
            <Text color={theme.color.black} size="16px" bold margin="0px 5px">
              전체 약관 동의
            </Text>
          </label>
        </EachCheckWrap>
        <Rectangle src={Rect10} />
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
              <Text color={theme.color.gray1} size="12px" margin="0px 5px">
                회원가입 및 운영약관 동의 (필수)
              </Text>
            </label>
            <RightIcon
              onClick={() => {
                //modal
              }}
            >
              <HiOutlineChevronRight className="right" />
            </RightIcon>
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
              <Text color={theme.color.gray1} size="12px" margin="0px 5px">
                개인정보 수집 및 이용 동의 (필수)
              </Text>
            </label>
            <RightIcon
              onClick={() => {
                //modal
              }}
            >
              <HiOutlineChevronRight className="right" />
            </RightIcon>
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
              <Text color={theme.color.gray1} size="12px" margin="0px 5px">
                위치정보 이용약관 동의 (필수)
              </Text>
            </label>
            <RightIcon
              onClick={() => {
                //modal
              }}
            >
              <HiOutlineChevronRight className="right" />
            </RightIcon>
          </EachCheckWrap>
        </CheckWrap>
      </MainWrap>
    </React.Fragment>
  );
};

// styled components 작성 위치
const MainWrap = styled.div`
  position: relative;
  padding: 10px;
`;
const CheckWrap = styled.div`
  position: absolute;
  top: 32%;
  left: 5%;
`;
const EachCheckWrap = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;
const RightIcon = styled.div`
  position: absolute;
  margin-left: 130%;
`;
const Rectangle = styled.img``;

// default props 작성 위치
Agreement.defaultProps = {};

export default Agreement;
