import React from 'react';
import styled from '@emotion/styled';
import Logo from 'components/Logo';

const Container = styled.section`
  padding-top: 40px;
`;

const Header = () => {


  return (
    <Container>
      <Logo height={80} />
    </Container>
  );
};

export default Header;
