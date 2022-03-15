// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPreview } from '../redux/modules/image';
import { getOnePlan } from '../redux/modules/plan';
import Headerbar from '../shared/Headerbar';
import { Button, Grid, Text } from '../elements';
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
  useEffect(() => {
    dispatch(getOnePlan(1));
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const preview = useSelector(state => state.image.preview);
  const Plan = useSelector(state => state.plan.plans);
  const list = useSelector(state => state.plan.data);
  const img = Plan.imageList;
  console.log(preview, Plan, img);

  const handleFileInput = e => {
    const render = new FileReader();
    const file = e.target.files[0];

    render.readAsDataURL(file);

    render.onloadend = () => {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      // axios
      //   .post('http://3.36.63.204/api/upload', formData, {
      //     headers: { 'Content-Type': 'multipart/form-data' },
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // logger('보냄');
      dispatch(setPreview(render.result));
    };
  };
  return (
    <>
      <Headerbar
        text="나의 모임"
        _onClickClose={() => {
          navigate(-1);
        }}
        _onClickEdit={() => {
          console.log('Edit');
        }}
      />
      <Grid padding="20px">
        <Text color={theme.color.black} bold>
          모임 이름
        </Text>
        <Text color={theme.color.gray4} size="9px">
          주소
        </Text>
      </Grid>
      <Grid is_flex center>
        {img && img.map(plan => <Img src={plan.image} />)}
      </Grid>
      {/* <Img src={preview ? preview : 'http://via.placeholder.com/400x300'} />; */}
      <Button
        is_float
        onClick={() => {
          navigate(-1);
        }}
      >
        <FiUpload size="24px" />
      </Button>
      <button
        onClick={() => {
          console.log('test');
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
  width: 50%;
  height: auto;
`;

// default props 작성 위치
PlansDetail.defaultProps = {};

export default PlansDetail;
