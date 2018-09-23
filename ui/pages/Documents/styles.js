import styled from 'styled-components';

export const StyledDocuments = styled.div`
  header {
    margin: 0px 0 20px;
  }

  @media screen and (min-width: 768px) {
    header {
      margin: 0 0 20px;
    }
  }
`;

export const DocumentsList = styled.div`
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Document = styled.div`
  position: relative;
  border: 1px solid var(--gray-lighter);
  border-top: 5px solid var(--gray-lighter);
  padding: 20px;
  border-radius: 3px;
  min-height: 180px;
  transition: transform 0.3s ease-in-out;

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  header {
    margin: 0;
  }

  h2 {
    margin: 10px 0 0;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    margin: 10px 0 0;
    color: var(--gray-light);
  }

  &:hover {
    transform: scale(1.02, 1.02);
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;
