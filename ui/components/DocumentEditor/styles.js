import styled from 'styled-components';

export const StyledDocumentEditor = styled.div`
  border: 1px solid var(--gray-lighter);
  height: calc(100vh - 247px);
  border-radius: 3px;
  margin-top: 20px;

  .control-label {
    display: none;
  }

  .form-control {
    border: none;
    box-shadow: none;
    padding: 25px;
  }

  form {
    height: 100%;
  }
`;

export const DocumentEditorTitle = styled.div`
  border-bottom: 1px solid var(--gray-lighter);

  .form-control {
    height: 60px;
    font-size: 16px;
    line-height: 22px;
  }
`;

export const DocumentEditorBody = styled.div`
  height: calc(100% - 60px);

  .form-control {
    height: calc(100% - 1px);
    font-size: 16px;
    line-height: 22px;
    resize: none;
  }
`;

export const DocumentEditorFooter = styled.div`
  padding: 25px 0;
`;
