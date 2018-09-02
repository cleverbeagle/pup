import styled from 'styled-components';
import { ListGroup as BListGroup, ListGroupItem as BListGroupItem } from 'react-bootstrap';

const AdminUsersHeader = styled.div`
  h4 span {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 15px;
    margin-left: 3px;
    background: var(--gray-lighter);
    color: var(--gray);
  }

  .SearchInput {
    float: right;
    width: 200px;
  }
`;

const ListGroup = styled(BListGroup)`
  margin-bottom: 0;
`;

const ListGroupItem = styled(BListGroupItem)`
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

    span:not(.label) {
      color: var(--gray-light);
      margin-left: 5px;
    }

    .label {
      display: inline-block;
      position: relative;
      top: -1px;
      margin-left: 3px;
    }

    .label-facebook {
      background: var(--facebook);
      color: #fff;
    }

    .label-google {
      background: var(--google);
      color: #fff;
    }

    .label-github {
      background: var(--github);
      color: #fff;
    }

    .roles {
      position: absolute;
      right: 60px;
    }
  }
`;

export default {
  AdminUsersHeader,
  ListGroup,
  ListGroupItem,
};
