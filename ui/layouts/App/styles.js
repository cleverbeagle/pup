import styled from 'styled-components';

export default styled.div`
  visibility: ${(props) => (props.ready && props.loading !== 'true' ? 'visible' : 'hidden')};

  > .container {
    margin-bottom: 80px;
    padding-bottom: 20px;
  }

  .verify-email {
    margin-bottom: 0;
    padding: 0;
    border-top: none;
    border-bottom: 1px solid #e7e7e7;
    background: #fff;
    color: var(--gray-dark);
    border-radius: 0;

    p {
      padding: 19px;
    }

    .btn {
      padding: 0;
    }
  }
`;
