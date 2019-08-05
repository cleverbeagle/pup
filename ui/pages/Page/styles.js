import styled from 'styled-components';

export const StyledPage = styled.div`
  margin-bottom: 0px;

  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 22px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 30px 0 20px;
  }

  p {
    margin-bottom: 20px;
  }

  > *:first-child {
    margin-top: 0px;
  }

  > *:last-child {
    margin-bottom: 0px;
  }

  @media screen and (min-width: 768px) {
    max-width: 700px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 22px;
  }
`;
