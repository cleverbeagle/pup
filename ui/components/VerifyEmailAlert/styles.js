import styled from 'styled-components';

const VerifyEmailAlert = styled.div`
  .alert {
    margin-bottom: 0;
    padding: 0;
    border-top: none;
    border-bottom: 1px solid #e7e7e7;
    background: #fff;
    color: var(--gray-dark);
    border-radius: 0;

    p {
      padding-top: 19px;
    }

    .btn {
      padding: 0;
      text-decoration: underline;
      margin-left: 5px;
      margin-top: -2px;
    }
  }
`;

export default {
  VerifyEmailAlert,
};
