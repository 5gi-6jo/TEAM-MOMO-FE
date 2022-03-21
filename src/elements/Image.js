import styled from 'styled-components';
import React from 'react';

const Image = props => {
  const { shape, src, size, ref } = props;

  const styles = {
    src: src,
    size: size,
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

export default Image;
