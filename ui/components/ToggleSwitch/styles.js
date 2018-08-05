import styled from 'styled-components';

const ToggleSwitch = styled.div`
  display: inline-block;
  min-width: 58px;
  background: ${(props) => (props.toggled ? 'var(--success)' : '#ccc')};
  border-radius: 100px;
  transition: background 200ms ease, padding 200ms ease;
  text-align: left;
  padding: ${(props) => (props.toggled ? '4px 10px 4px 4px' : '4px 4px 4px 10px')};

  &:hover {
    cursor: pointer;
  }

  .handle {
    display: inline-block;
    min-width: 45px;
    height: 26px;
    background: #fff;
    border-radius: 100px;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--success);
    text-align: center;
    padding: 0 10px;

    .handle-label {
      display: inline-block;
      margin-top: 3px;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: ${(props) => (props.toggled ? 'var(--success)' : '#ccc')};
    }
  }
`;

export default {
  ToggleSwitch,
};
