import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'components/Icon';
import { genericFunction } from 'typings/utils';
import { fillContainer, hide, centerContent } from 'style/modifiers';
import { colorGradient, colorPrimary, easeInOut } from 'style/theme';
import css from '@emotion/css';
import { Global } from '@emotion/core';

type Props = {
  images: string[];
  activePos: number;
  projectId: number;
  isOpen: boolean;
  title?: string;
  increasePos: genericFunction;
  decreasePos: genericFunction;
  closeModal: genericFunction;
};

const Container = styled.div`
  ${centerContent};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: visible;
  transition: 160ms;

  overflow: hidden;

  background: ${colorGradient(undefined, 0.9)};
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border: 0;

  object-fit: contain;

  transition: 360ms ${easeInOut};
`;

const ImgContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 42px;
  bottom: 24px;
  left: 42px;
`;

const Button = styled.button`
  ${centerContent};
  position: absolute;
  transition: 160ms;
  opacity: 0.7;
  cursor: pointer;
  visibility: visible;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: #fff;
  }
`;

const arrowButtons = css`
  width: 40%;
  height: 100%;
`;

const ArrowWrapper = styled.div`
  ${centerContent};

  position: absolute;
  transition: 160ms ease-out;

  background: ${colorPrimary};
  border-radius: 100px;
  height: 54px;
  width: 54px;
`;

const Title = styled.h1`
  position: absolute;
  top: 8px;
  font-size: 16px;
  font-weight: 300;

  color: #fff;
`;

const iconsSize = 42;

const Gallery = ({
  images,
  activePos,
  isOpen,
  projectId,
  title,
  increasePos,
  decreasePos,
  closeModal,
}: Props) => (
  <Container
    css={[!isOpen && hide]}
  >
    <Global
      styles={
        isOpen &&
        css`
          body {
            overflow: hidden;
          }
        `
      }
    />
    {title && <Title>{title}</Title>}
    <ImgContainer key={`img-${projectId}`}>
      {images.map((img, i) =>
        (activePos - i === 1 || activePos - i === -1 || activePos - i === 0 ? (
          <Img
            key={i}
            src={img}
            style={{
              transform: `translate3d(${(i - activePos) * 100}vw, 0, 0)`,
            }}
          />
        ) : (
          undefined
        )),
      )}
    </ImgContainer>
    <Button
      type="button"
      title="Imagem Anterior"
      css={[activePos === 0 && hide, arrowButtons, { left: 0 }]}
      onClick={decreasePos}
      key={`left-btn-${projectId}`}
    >
      <ArrowWrapper
        css={css`
          left: 24px;

          ${Button}:hover & {
            transform: translate3d(4px, 0, 0);
          }
        `}
      >
        <Icon name="arrowLeft" size={iconsSize} />
      </ArrowWrapper>
    </Button>
    <Button
      type="button"
      title="Próxima Imagem"
      css={[
        activePos === images.length - 1 && hide,
        arrowButtons,
        { right: 0 },
      ]}
      onClick={increasePos}
      key={`right-btn-${projectId}`}
    >
      <ArrowWrapper
        css={css`
          right: 24px;

          ${Button}:hover & {
            transform: translate3d(4px, 0, 0);
          }
        `}
      >
        <Icon name="arrowRight" size={iconsSize} />
      </ArrowWrapper>
    </Button>
    <Button
      title="Fechar"
      css={css`
        height: 40px;
        width: 40px;
        top: 12px;
        right: 12px;
        opacity: 0.7;
      `}
      type="button"
      onClick={closeModal}
    >
      <Icon name="close" size={iconsSize} />
    </Button>
  </Container>
);

export default Gallery;
