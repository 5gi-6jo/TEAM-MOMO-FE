import React from 'react';
import styled from 'styled-components';
import Modal from 'react-awesome-modal';

const Modalel = props => {
  const { visible, children, Away } = props;

  return (
    <>
      <Modal
        visible={visible}
        width="600"
        height="400"
        effect="fadeInUp"
        onClickAway={Away}
      >
        {children}
      </Modal>
    </>
  );
};

Modalel.defaultProps = {
  visible: false,
  children: null,
  Away: () => {},
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

export default Modalel;
