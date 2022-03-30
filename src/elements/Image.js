import styled from 'styled-components';
import React from 'react';

const Image = props => {
  const { shape, src, size, ref, _onClick } = props;

  const styles = {
    src: src,
    size: size,
    onClick: _onClick,
  };

  if (shape === 'circle') {
    return <ImageCircle ref={ref} {...styles}></ImageCircle>;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner src={props.src} ref={ref} {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  if (shape === 'is_float') {
    return (
      <>
        <FloatImage src={src} ref={ref} {...styles}></FloatImage>
      </>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault ref={ref} {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: 'circle',
  src: 'http://via.placeholder.com/400x300',
  size: 36,
  is_float: false,
  _onClick: () => {},
};

const ImageDefault = styled.div`
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url('${props => props.src}');
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const AspectInner = styled.img`
  position: relative;
  width: 100%;
  object-fit: contain; //cover
  /* padding-top: 75%; */
  /* overflow: hidden; */
  /* background-image: url('${props => props.src}'); */
  /* background-size: contain;
  background-repeat: no-repeat; */

  height: 100%;
`;

const ImageCircle = styled.div`
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${props => props.src}');

  background-size: cover;
  margin: 4px;
`;

const FloatImage = styled.img`
  top: 10%;
  left: 10%;
  width: 64px;
  height: 62px;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  position: absolute;
  z-index: 1;
`;
export default Image;
