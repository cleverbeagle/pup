import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

const ServiceBadge = styled(Badge)`
  position: relative;
  top: -2px;
  font-size: 10px;
  margin-left: 3px;
  color: #fff;
  background: ${(props) => `var(--${props.service})`};
`;

export default {
  ServiceBadge,
};
