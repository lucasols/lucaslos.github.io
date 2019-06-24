import React from 'react';
import styled from '@emotion/styled';
import SectionHeader from 'components/SectionHeader';
import Button from 'components/Button';
import css from '@emotion/css';
import { centerContentCollum, centerContent } from 'style/modifiers';

const Container = styled.div`
  ${centerContentCollum};
  padding-bottom: 80px;

  width: 100%;
  max-width: 800px;
`;

const RepositoryLink = styled.a`
  position: absolute;
  bottom: 8px;
  text-align: center;
  text-decoration: underline;
`;

const circularButton = css`
  height: 64px;
  width: 64px;
  padding: 0;
  margin-right: 16px;
`;

const iconSize = 32;

const Contact = () => (
  <>
    <SectionHeader name="Contato" />
    <Container id="contato">
      <Button
        label="hello@lucassantos.net"
        href="mailto:hello@lucassantos.net"
        icon="email"
        css={css`
          height: 56px;
          text-transform: none;
          font-size: 24px;
          padding: 0 28px;
          width: auto;
          margin-bottom: 20px;
        `}
      />

      <div css={{ marginRight: -16 }}>
        <Button css={circularButton} icon="linkedIn" iconSize={iconSize} href="" />
        <Button css={circularButton} icon="medium" iconSize={iconSize} href="" />
        <Button css={circularButton} icon="behance" iconSize={iconSize} href="" />
        <Button css={circularButton} icon="github" iconSize={iconSize} href="" />
      </div>
      <RepositoryLink href="https://github.com/lucaslos/lucaslos.github.io" target="_blank">
        Confira o código desse site no github
      </RepositoryLink>
    </Container>
  </>
);

export default Contact;
