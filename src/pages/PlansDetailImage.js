// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Headerbar from '../shared/Headerbar';
import { Image, Grid } from '../elements';
import { trash_2 } from '../img';
import theme from '../Styles/theme';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { setFooterView } from '../redux/modules/mainsys';
import { saveAs } from 'file-saver';
import { deleteImage } from '../redux/modules/plan';
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

  useEffect(() => {
    dispatch(setFooterView(false));
    return dispatch(setFooterView(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  const downloadButton = () => {
    saveAs(props.image, 'image.jpg');
  };
  return (
    <>
      <Headerbar
        text={props.Plan.planName}
        _onClickClose={() => {
          navigate(`/plansdetail/${props.planId}`, { state: props.planId });
        }}
        _onClickEdit={() => {
          // console.log('Edit');
        }}
      />
      <ImageDiv>
        <Image shape="rectangle" src={props.image}></Image>
        {backimage && (
          <IoIosArrowBack
            cursor="pointer"
            style={{
              position: 'absolute',
              left: '1%',
            }}
            size="46px"
            color={theme.color.white}
            onClick={() => {
              navigate(`/plansdetail/images/${props.planId}`, {
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
            color={theme.color.white}
            onClick={() => {
              navigate(`/plansdetail/images/${props.planId}`, {
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
        {/* <Grid
          center
          is_cursor
          addStyle={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          _onClick={downloadButton}
        >
          <Icon src={log_in} />
        </Grid> */}
        <Grid
          center
          is_cursor
          addStyle={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          _onClick={() => {
            const data = {
              planId: props.planId,
              imageId: props.imageId,
            };
            dispatch(deleteImage(data));
            navigate(`/plansdetail/${props.planId}`, { state: props.planId });
          }}
        >
          <Icon src={trash_2} />
        </Grid>
      </Wrap>
    </>
  );
};
//test
// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars
const ImageDiv = styled.div`
  width: 100%;
  height: calc(100% - 90px);
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
`;
const Wrap = styled.div`
  width: 100%;
  height: 46px;
  position: absolute;
  bottom: 0%;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  background-color: ${theme.color.realblack};
  padding: 12px 0px;
  box-sizing: border-box;

  & .lastIcon:last-child {
    margin: 0;
  }
  z-index: 135;
`;
// default props 작성 위치
PlansDetailImage.defaultProps = {};

export default PlansDetailImage;
