import React from 'react';
import styled from 'styled-components';
import Modal from 'react-awesome-modal';
import theme from '../Styles/theme';

const Modalel = props => {
  const { setNickName, visible, _onChange, Away, width, height } = props;

  if (setNickName) {
    return (
      <>
        {visible && (
          <ModalWrapper>
            <MainModal>
              {/* <Modal
            visible={visible}
            width={width}
            height={height}
            effect="fadeInUp"
            onClickAway={Away}
          >
            test
            {children}
          
          </Modal> */}
              <ModalCenter>
                <div>닉네임 설정</div>
                <div>닉네임을 입력해주세요.</div>
                <input onChange={_onChange}></input>

                <ButtonGridStyle>
                  <ButtonStylecencel>취소</ButtonStylecencel>
                  <ButtonStyleok>확인</ButtonStyleok>
                </ButtonGridStyle>
              </ModalCenter>
            </MainModal>
          </ModalWrapper>
        )}
      </>
    );
  }

  return;
};

Modalel.defaultProps = {
  visible: false,
  children: null,
  width: '200px',
  height: '150px',
  Away: () => {},
  setNickName: false,
  _onChange: () => {},
};

const ModalWrapper = styled.div`
  position: relative;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
const MainModal = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background-color: white;
  border: 1px solid #9e9e9e;
  box-sizing: border-box;
  border-radius: 15px;
`;
const ModalCenter = styled.div`
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  flex-direction: column;
`;
const ButtonGridStyle = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
`;
const ButtonStyleok = styled.div`
  width: 100px;
  height: 37px;
  max-height: 200px;
  border: 1px solid #9e9e9e;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.gray1};
  border-radius: 0px 0px 15px 0px;
`;
const ButtonStylecencel = styled.div`
  width: 96px;
  height: 37px;
  max-height: 200px;
  border: 1px solid #9e9e9e;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.gray4};
  border-radius: 0px 0px 0px 15px;
`;
export default Modalel;
