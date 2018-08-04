import styled from 'styled-components';

const OAuthLoginButtons = styled.div`
  margin-bottom: 25px;

  ${props => (props.emailMessage ? `
    position: relative;
    border-bottom: 1px solid var(--gray-lighter);
    padding-bottom: 30px;
    margin-bottom: 30px;
  ` : '')}
`;

const EmailMessage = styled.p`
  display: inline-block;
  background: #fff;
  padding: 0 10px;
  position: absolute;
  bottom: -19px;
  left: 50%;
  margin-left: -${props => props.offset}px;
`;

export default {
  OAuthLoginButtons,
  EmailMessage,
};
