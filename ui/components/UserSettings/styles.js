import styled from 'styled-components';
import { ListGroupItem as BListGroupItem } from 'react-bootstrap';

const Setting = styled(BListGroupItem)`
  display: flexbox;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  p {
    flex-grow: 1;
    margin: 0 5px 0 0;
  }

  > div {
    flex-grow: 0;
  }
`;

export default {
  Setting,
};
