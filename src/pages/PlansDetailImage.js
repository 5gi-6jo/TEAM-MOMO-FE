// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPreview } from '../redux/modules/image';
import { getOnePlan } from '../redux/modules/plan';
import Headerbar from '../shared/Headerbar';
import { Button, Image, Grid, Text } from '../elements';
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

// default props 작성 위치
PlansDetailImage.defaultProps = {};

export default PlansDetailImage;
