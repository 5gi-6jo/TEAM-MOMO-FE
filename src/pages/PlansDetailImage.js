// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Headerbar from '../shared/Headerbar';
import { Button, Image, Grid, Text } from '../elements';
import { log_in } from '../img';
import theme from '../Styles/theme';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import { logger } from '../shared/utils';

// const writeIcon = '../img/review_write.png';

/**
 * @param {*} props = 단일 모임정보/선택한 이미지 url/선택한 이미지 id /모임 id
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlansDetailImage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //부모에서 넘겨받을때 모임 아이디를 받음
  const props = useLocation().state;
  const imageidx = props.Plan.imageList.findIndex(
    e => e.imageId === props.imageId,
  );
  const backimage = props.Plan.imageList[imageidx - 1];
  const forwardimage = props.Plan.imageList[imageidx + 1];

  console.log(props);
  useEffect(() => {}, []);

  return (
    <>
      <Headerbar
        text={props.Plan.planName}
        _onClickClose={() => {
          navigate(`/plansdetail/${props.planId}`, { state: props.planId });
        }}
        _onClickEdit={() => {
          console.log('Edit');
        }}
      />
      <ImageDiv>
        <Image shape="rectangle" src={props.image}>
          <Grid is_flex center></Grid>
        </Image>
        {backimage && (
          <IoIosArrowBack
            cursor="pointer"
            style={{
              position: 'absolute',
              left: '1%',
            }}
            size="46px"
            color={theme.color.orange}
            onClick={() => {
              navigate(`/plansdetail/${props.planId}/images`, {
                state: {
                  Plan: props.Plan,
                  planId: props.planId,
                  imageId: backimage.imageId,
                  image: backimage.image,
                },
              });
            }}
          />
        )}
        {forwardimage && (
          <IoIosArrowForward
            cursor="pointer"
            style={{
              position: 'absolute',
              right: '1%',
            }}
            size="46px"
            color={theme.color.orange}
            onClick={() => {
              navigate(`/plansdetail/${props.planId}/images`, {
                state: {
                  Plan: props.Plan,
                  planId: props.planId,
                  imageId: forwardimage.imageId,
                  image: forwardimage.image,
                },
              });
            }}
          />
        )}
      </ImageDiv>
      <Wrap>
        <Icon
          src={log_in}
          onClick={() => {
            console.log('log_in');
          }}
        />
      </Wrap>
    </>
  );
};
//test
// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars
const ImageDiv = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.realblack};
`;

const Icon = styled.div`
  min-width: 36px;
  min-height: 36px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  margin-right: 12px;
`;
const Wrap = styled.div`
  width: 100%;
  height: 72px;
  position: absolute;
  bottom: 76px;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  border-radius: 12px;
  background-color: ${theme.color.orange};
  justify-content: space-evenly;
  padding: 18px 20px;
  box-sizing: border-box;

  & .lastIcon:last-child {
    margin: 0;
  }
  z-index: 135;
`;
// default props 작성 위치
PlansDetailImage.defaultProps = {};

export default PlansDetailImage;
