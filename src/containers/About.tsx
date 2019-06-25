import React from 'react';
import styled from '@emotion/styled';
import { colorPrimary, fontSecondary } from 'style/theme';
import { letterSpacing } from 'style/helpers';
import { centerContentCollum } from 'style/modifiers';
import InlineLink from 'components/InlineLink';
import { mqMobile } from 'style/mediaQueries';

const Container = styled.section`
  ${centerContentCollum};
  margin-top: 40px;

  h1 {
    text-align: center;
    color: ${colorPrimary};
    font-size: 45px;
    font-weight: 400;
    ${letterSpacing(4)};
    margin-bottom: 32px;

    ${mqMobile} {
      font-size: 28px;
    }
  }

  p {
    padding: 0 54px;
    font-size: 22px;
    width: 100%;
    max-width: 800px;
    margin-bottom: 16px;
    line-height: 1.6;
    /* text-align: center; */

    ${mqMobile} {
      padding: 0 32px;
      font-size: 16px;
    }
  }
`;

const About = () => (
  <Container id="sobre">
    <h1>Olá! Sou Lucas Santos</h1>
    <p>
      Um Designer de Produtos e Desenvolvedor Front-End comprometido em resolver
      problemas de forma criativa, criando produtos e experiências digitais
      intuitivas, inovadoras e fascinantes para tornar a vida das pessoas mais
      fácil.
    </p>
    <p>
      Trabalho criando soluções de mobilidade para os veículos da BMW no{' '}
      <InlineLink href="https://www.youtube.com/watch?v=amyePR7zFOI">
        Projeto Mobilty da BMW/Poli-USP
      </InlineLink>{' '}
      e como consultor de Design no projeto{' '}
      <InlineLink href="https://www.linkedin.com/feed/update/urn:li:activity:6536990658077478912">
        Delivery-Robot da Poli-USP
      </InlineLink>
      . Estou no 4º ano de Design na Faculdade de Arquitetura e Urbanismo da USP.
    </p>
    <p>
      Mais detalhes sobre mim você encontra nos links da seção{' '}
      <InlineLink href="#contato" noNewTab>contato</InlineLink> ou meu{' '}
      <InlineLink href="https://www.linkedin.com/in/lucasols/">
        LinkedIn
      </InlineLink>
    </p>
  </Container>
);

export default About;
