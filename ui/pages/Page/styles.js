import styled from 'styled-components';

const Header = styled.div`
  border-bottom: 1px solid var(--gray-lighter);
  padding: 0px 0 20px;
  margin-bottom: 20px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0;
    color: var(--gray-light);
  }

  @media screen and (min-width: 768px) {
    padding: 10px 0 30px;
    margin-bottom: 30px;

    h1 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 20px 0 40px;
    margin-bottom: 40px;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
`;

const Page = styled.div`
  margin-bottom: 0px;

  @include media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const Content = styled.div`
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

export default {
  Page,
  Content,
  Header,
  HeaderContainer,
};
