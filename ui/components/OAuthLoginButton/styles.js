import styled from 'styled-components';
import { darken } from 'polished';

export default styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  border: none;
  background: var(--gray-lighter);
  border-radius: 3px;

  i {
    margin-right: 3px;
    font-size: 18px;
    position: relative;
    top: 1px;
  }

  &.OAuthLoginButton-facebook {
    background: var(--facebook);
    color: #fff;

    &:hover {
      background: ${darken(0.05, '#3b5998')};
    }
  }

  &.OAuthLoginButton-google {
    background: var(--google);
    color: #fff;

    &:hover {
      background: ${darken(0.05, '#ea4335')};
    }
  }

  &.OAuthLoginButton-github {
    background: var(--github);
    color: #fff;

    &:hover {
      background: ${darken(0.05, '#333333')};
    }
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:active,
  &:focus {
    outline: 0;
  }

  &:not(:last-child) {
    margin-top: 10px;
  }
`;
