import styled from 'styled-components';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

export const StyledListGroup = styled(ListGroup)`
  margin-bottom: 0;
`;

export const ServiceBadge = styled(Badge)`
  display: inline-block;
  position: relative;
  top: -1px;
  margin-left: 3px;
  color: #fff;
  background: ${(props) => `var(--${props.service})`};
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  padding: 15px;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 75px;
    display: block;
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(255, 255, 255, 1) 100%);
  }

  &:hover {
    background: #fafafa;

    &:after {
      display: none;
    }
  }

  a {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  p {
    margin: 0;
    white-space: nowrap;

    span:not(.badge) {
      color: var(--gray-light);
      margin-left: 5px;
    }
  }
`;
