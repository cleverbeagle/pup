import styled from 'styled-components';
import { ListGroupItem } from 'react-bootstrap';

export default styled(ListGroupItem)`
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
