import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

const ServiceBadge = styled(Badge)`
  color: #fff;
  background: ${(props) => `var(--${props.service})`};
`;

export default {
  ServiceBadge,
};
