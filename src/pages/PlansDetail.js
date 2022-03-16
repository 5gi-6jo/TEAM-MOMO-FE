// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPreview } from '../redux/modules/image';
import { getImage, getOnePlan, setUploadImage } from '../redux/modules/plan';
import Headerbar from '../shared/Headerbar';
import { Button, Grid, Input, Text } from '../elements';
import theme from '../Styles/theme';
import { FiUpload } from 'react-icons/fi';
// import { logger } from '../shared/utils';

// const writeIcon = '../img/review_write.png';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlansDetail = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const preview = useSelector(state => state.image.preview);
  //리덕스에서 한개의 모임 데이터 받아옴
  const Plan = useSelector(state => state.plan.showplan);
  const Images = useSelector(state => state.images);

  const img = Plan.imageList;

  //부모에서 넘겨받을때 모임 아이디를 받음
  const planId = useLocation().state;
  console.log(planId, Plan);
  useEffect(() => {
    dispatch(getOnePlan(planId));
  }, []);
  const handleFileInput = e => {
    const render = new FileReader();

    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    // console.log(formData);
    const data = { formData, planId };
    dispatch(setUploadImage(data));
    console.log('send');

    // render.readAsDataURL(file);

    // render.onloadend = () => {
    //   const formData = new FormData();
    //   formData.append('file', e.target.files[0]);
    //   // axios
    //   //   .post('http://3.36.63.204/api/upload', formData, {
    //   //     headers: { 'Content-Type': 'multipart/form-data' },
    //   //   })
    //   //   .then(res => {
    //   //     console.log(res);
    //   //   })
    //   //   .catch(error => {
    //   //     console.log(error);
    //   //   });
    //   // logger('보냄');
    //   dispatch(setPreview(render.result));
    // };
  };
  return (
    <>
      <Headerbar
        is_Edit
        text="나의 모임"
        _onClickClose={() => {
          navigate('/');
        }}
        _onClickEdit={() => {
          console.log('Edit');
        }}
      />
      <Grid padding="20px">
        <Text color={theme.color.black} bold>
          {Plan.planName}
        </Text>
        <Text color={theme.color.gray4} size="9px">
          {Plan.destination}
        </Text>
      </Grid>
      <Grid is_Grid>
        {img &&
          img.map(plan => (
            <Img
              key={plan.imageId}
              src={plan.image}
              onClick={() => {
                navigate(`/plansdetail/${planId}/images`, {
                  state: {
                    Plan: Plan,
                    planId: planId,
                    imageId: plan.imageId,
                    image: plan.image,
                  },
                });
              }}
            />
          ))}
      </Grid>
      {/* <Img src={preview ? preview : 'http://via.placeholder.com/400x300'} />; */}
      <Input
        is_float
        _type="file"
        _accept="image/x-png,image/jpeg"
        _onChange={handleFileInput}
        onClick={() => {
          console.log('button');
        }}
      >
        <FiUpload size="24px" />
      </Input>
      <button
        onClick={() => {
          console.log('Images', Images);
          dispatch(getImage(planId));
        }}
      >
        불러오기 테스트
      </button>
      <input
        type="file"
        accept="image/x-png,image/jpeg"
        onChange={handleFileInput}
      />
    </>
  );
};
//test
// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars
const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

// default props 작성 위치
PlansDetail.defaultProps = {};

export default PlansDetail;
