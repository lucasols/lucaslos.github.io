import styled from '@emotion/styled';
import { ellipsis } from 'polished';
import React from 'react';
import { circle, rectSize } from 'style/helpers';
import { centerContent, centerContentCollum, hide, show } from 'style/modifiers';
import { colorBg, colorBgRgba, colorPrimary, colorPrimaryRgba, colorSecondaryRgba, fontSecondary } from 'style/theme';
import { obj } from 'typings/utils';
import { OpaqueInterpolation, animated } from 'react-spring';

type Id = string | number;

type Props = {
  items: {
    id: Id;
    label: string;
  }[];
  activeId: Id;
  onClickItem: (id: Id) => any;
  style: obj<OpaqueInterpolation<string | number>>;
};

const Container = styled(animated.div)`
  ${centerContentCollum};
  justify-content: space-between;
  max-height: 500px;
  width: 10px;
`;

const Line = styled.div`
  top: 12px;
  bottom: 12px;
  position: absolute;
  width: 1px;
  background: ${colorPrimaryRgba(0.3)};
`;

const SteepWrapper = styled.div<{ active: boolean }>`
  ${centerContent};
  ${rectSize(32)};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};

  cursor: pointer;
`;

const Tolltip = styled.div`
  ${ellipsis(240)};
  position: absolute;
  padding: 10px 32px 10px 16px;
  right: 0;
  background: ${colorBgRgba(0.9)};
  border-radius: 32px;
  font-size: 12px;
  font-weight: 300;
  font-family: ${fontSecondary};
  border: 0.5px solid ${colorSecondaryRgba(0.5)};
  transition: 160ms;
  transform: translate3d(4px, 0, 0);
  ${hide};

  ${SteepWrapper as any}:hover & {
    ${show};

    transform: translate3d(0, 0, 0);
  }
`;

const Steep = styled.div<{ active: boolean }>`
  ${circle(10)};
  border: 1px solid ${colorPrimary};
  background: ${props => (props.active ? colorPrimary : colorBg)};
  transition: 240ms;
`;

const Steeper = ({ items, activeId, onClickItem, style }: Props) => (
  <Container
    className="steeper"
    css={{ height: (items.length - 1) * 72 + 32 }}
    style={style}
  >
    <Line />
    {items.map(item => (
      <SteepWrapper
        key={item.id}
        active={activeId === item.id}
        onClick={() => onClickItem(item.id)}
      >
        <Tolltip>{item.label}</Tolltip>
        <Steep active={activeId === item.id} />
      </SteepWrapper>
    ))}
  </Container>
);

export default Steeper;
