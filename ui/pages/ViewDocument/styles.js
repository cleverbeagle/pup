import styled from 'styled-components';

export const StyledViewDocument = styled.div`
  border: 1px solid var(--gray-lighter);
  padding: 25px;
  border-radius: 3px;
  max-width: 750px;
  margin: 0 auto;

  h1 {
    margin: 0 0 25px;
    font-size: 22px;
    line-height: 28px;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto 20px;
    padding: 50px;
  }
`;

export const DocumentBody = styled.div`
  font-size: 16px;
  line-height: 22px;

  > * {
    margin-bottom: 20px;
    white-space: pre-line;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;
