import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import { Rect10 } from '../img';
import theme from '../Styles/theme';
import { HiOutlineChevronRight } from 'react-icons/hi';
import ModalConfirm from '../components/Modal/ModalConfirm';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Agreement = props => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(false);
  const [checkC, setCheckC] = useState(false);

  const checkAllHandelr = () => {
    if (checkAll === false) {
      setCheckAll(true);
      setCheckA(true);
      setCheckB(true);
      setCheckC(true);
    } else {
      setCheckAll(false);
      setCheckA(false);
      setCheckB(false);
      setCheckC(false);
    }
  };

  const checkAHandler = () => {
    if (checkA === false) {
      setCheckA(true);
    } else {
      setCheckA(false);
    }
  };
  const checkBHandler = () => {
    if (checkB === false) {
      setCheckB(true);
    } else {
      setCheckB(false);
    }
  };
  const checkCHandler = () => {
    if (checkC === false) {
      setCheckC(true);
    } else {
      setCheckC(false);
    }
  };

  useEffect(() => {
    if (checkA === true && checkB === true && checkC === true) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkA, checkB, checkC]);

  useEffect(() => {
    props.setChecked(checkAll);
  });

  const [modalOpenA, setModalOpenA] = useState(false);

  const openModalA = () => {
    setModalOpenA(true);
  };
  const closeModalA = () => {
    setModalOpenA(false);
  };
  const [modalOpenB, setModalOpenB] = useState(false);

  const openModalB = () => {
    setModalOpenB(true);
  };
  const closeModalB = () => {
    setModalOpenB(false);
  };
  const [modalOpenC, setModalOpenC] = useState(false);

  const openModalC = () => {
    setModalOpenC(true);
  };
  const closeModalC = () => {
    setModalOpenC(false);
  };

  return (
    <React.Fragment>
      <ModalConfirm
        open={modalOpenA}
        close={closeModalA}
        title="회원가입 및 운영약관 동의"
        contents="팝업창내용"
      ></ModalConfirm>
      <ModalConfirm
        open={modalOpenB}
        close={closeModalB}
        title="개인정보 수집 및 이용 동의"
        contents="팝업창내용"
      ></ModalConfirm>
      <ModalConfirm
        open={modalOpenC}
        close={closeModalC}
        title="위치정보 이용약관 동의"
        contents="팝업창내용"
      ></ModalConfirm>
      <MainWrap>
        <EachCheckWrap>
          <input
            type="checkbox"
            id="checkAll"
            onChange={checkAllHandelr}
            checked={checkAll}
          />
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
              id="checkA"
              onChange={checkAHandler}
              checked={checkA}
            ></input>
            <label id="checkA" htmlFor="checkA">
              <Text color={theme.color.gray1} size="12px" margin="0px 5px">
                회원가입 및 운영약관 동의 (필수)
              </Text>
            </label>
            <RightIcon onClick={openModalA}>
              <HiOutlineChevronRight className="right" />
            </RightIcon>
          </EachCheckWrap>

          <EachCheckWrap>
            <input
              type="checkbox"
              id="checkB"
              onChange={checkBHandler}
              checked={checkB}
            ></input>
            <label id="checkB" htmlFor="checkB">
              <Text color={theme.color.gray1} size="12px" margin="0px 5px">
                개인정보 수집 및 이용 동의 (필수)
              </Text>
            </label>
            <RightIcon onClick={openModalB}>
              <HiOutlineChevronRight className="right" />
            </RightIcon>
          </EachCheckWrap>
          <EachCheckWrap>
            <input
              type="checkbox"
              id="checkC"
              onChange={checkCHandler}
              checked={checkC}
            ></input>
            <label id="checkC" htmlFor="checkC">
              <Text color={theme.color.gray1} size="12px" margin="0px 5px">
                위치정보 이용약관 동의 (필수)
              </Text>
            </label>
            <RightIcon onClick={openModalC}>
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
