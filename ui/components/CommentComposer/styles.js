import styled from 'styled-components';

const StyledCommentComposer = styled.div`
  border: 1px solid var(--gray-lighter);
  border-radius: 3px;

  header {
    padding: 20px;
    border-bottom: 1px solid var(--gray-lighter);
    font-size: 15px;
    font-weight: 600;
  }

  .form-control {
    border: none !important;
    box-shadow: none !important;
    padding: 20px !important;
    min-height: 130px !important;
    resize: none !important;
    font-size: 15px;
    line-height: 23px;
  }

  .btn {
    margin: 20px;
  }
`;

export default StyledCommentComposer;
