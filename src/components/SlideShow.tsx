import React, { useState } from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { fillContainer } from 'style/modifiers';
import useInterval from 'utils/hooks/useInterval';

type Props = {
  imgs: string[];
  onClick: () => any;
};

const Container = styled.div`
  overflow: hidden;
`;

const Img = styled.div`
  ${fillContainer}
  cursor: zoom-in;
  transition: 240ms ease-out;
  background-size: cover;

  ${Container}:hover & {
    transform: scale(1.05);
  }
`;

const SlideShow = ({ imgs, onClick }: Props) => {
  const [activeImg, setActiveImg] = useState(0);
  const [startTime, setStartTime] = useState(Math.random() * 5000);

  useInterval(() => {
    if (imgs.length > 1) {
      setStartTime(0);
      setActiveImg(activeImg < imgs.length - 1 ? activeImg + 1 : 0);
    }
  }, 5000 + startTime);

  return (
    <Container onClick={onClick}>
      {imgs.map((img, i) => (
        <Img
          key={i}
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === activeImg ? 1 : 0,
          }}
        />
      ))}
    </Container>
  );
};

export default SlideShow;
