// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getImage, getOnePlan, setUploadImage } from '../redux/modules/plan';

import EditPlans from './EditPlans';
import Headerbar from '../shared/Headerbar';
import { Grid, Input, Text } from '../elements';
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
  //리덕스에서 한개의 모임 데이터 받아옴
  const Plan = useSelector(state => state.plan.showplan);

  const img = Plan.imageList;

  const [showModal, setShowModal] = useState('');

  //부모에서 넘겨받을때 모임 아이디를 받음
  const planId = useLocation().state;
  console.log(Plan);
  useEffect(() => {
    console.log('Detail::useEffect');
    dispatch(getOnePlan(planId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFileInput = e => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    // console.log(formData);
    const data = { files, planId };
    dispatch(setUploadImage(data));
    dispatch(getImage(planId));
  };
  return (
    <>
      <Headerbar
        is_Edit
        text="나의 모임"
        _onClickClose={() => {
          navigate(-1); //뒤로가기 버튼으로 변경
        }}
        _onClickEdit={() => {
          setShowModal(true);
          // navigate(`/Edit/${planId}`);
        }}
      />
      <Grid padding="20px">
        <Text color={theme.color.black} bold>
          {Plan.planName}
        </Text>
        {Plan.destination && (
          <Text color={theme.color.gray4} size="9px">
            {Plan.destination}
          </Text>
        )}
      </Grid>
      <Grid is_Grid>
        {img &&
          img.map(plan => (
            <Img
              key={plan.imageId}
              src={plan.image}
              onClick={() => {
                // dispatch(setFooterView(false));
                navigate(`/plansdetail/images/${planId}`, {
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

      {showModal && (
        <EditPlans
          planDate={Plan.planDate}
          planName={Plan.planName}
          des={Plan.destination}
          lat={Plan.lat}
          lng={Plan.lng}
          show={showModal}
          id={planId}
          setshow={setShowModal}
        />
      )}
    </>
  );
};
//test
// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars
const Img = styled.img`
  display: block;
  width: 100%;
  min-height: 175px;
  max-height: 175px;
  object-fit: cover;
`;

// default props 작성 위치
PlansDetail.defaultProps = {};

export default PlansDetail;
