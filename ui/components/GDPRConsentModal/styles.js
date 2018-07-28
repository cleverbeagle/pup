import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

const GDPRConsentModal = styled(Modal)`
  .modal-body > p {
    margin-bottom: 15px;
  }

  .list-group {
    margin-bottom: 0;
  }
`;

export default {
  GDPRConsentModal,
};
