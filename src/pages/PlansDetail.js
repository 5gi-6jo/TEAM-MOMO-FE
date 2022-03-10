// import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setPreview } from '../redux/modules/image';
// import { logger } from '../shared/utils';

// const writeIcon = '../img/review_write.png';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlansDetail = props => {
  const dispatch = useDispatch();
  const preview = useSelector(state => state.image.preview);

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
      <div>PlansDetail</div>
      <input
        type="file"
        accept="image/*;capture=camera"
        onChange={handleFileInput}
      />
      <Img src={preview ? preview : 'http://via.placeholder.com/400x300'} />
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
