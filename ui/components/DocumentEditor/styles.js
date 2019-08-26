import styled from 'styled-components';

export const DocumentEditorHeader = styled.div`
  p {
    float: right;
    margin-top: 6px;
    color: var(--gray-light);
  }

  .dropdown {
    float: left;
  }

  .dropdown > button svg,
  .dropdown-menu > button > svg {
    display: inline-block;
    margin-right: 5px;
    color: var(--gray-light);
  }

  .dropdown-menu > button.active > svg {
    color: #fff;
  }
`;

export const StyledDocumentEditor = styled.div`
  border: 1px solid var(--gray-lighter);
  height: calc(100vh - 207px);
  border-radius: 3px;
  margin-top: 20px;

  .form-label {
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

  @media screen and (min-width: 768px) {
    height: calc(100vh - 258px);
    margin-top: 20px;
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
  overflow: hidden;

  .form-control {
    height: calc(100% - 1px);
    font-size: 16px;
    line-height: 26px;
    resize: none;
    background: transparent; /* Ensures this input doesn't overflow when resizing browser vertically. */
  }
`;

export const DocumentEditorFooter = styled.div`
  padding: 15px 25px;
  border: 1px solid var(--gray-lighter);
  border-top: none;
  border-radius: 0 0 3px 3px;

  svg {
    float: left;
    width: 25px;
    height: auto;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }

  p {
    float: left;
    margin: 0;
  }

  p a {
    text-decoration: underline;
    color: var(--gray-light);
  }
`;
