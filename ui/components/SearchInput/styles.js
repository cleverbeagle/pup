import styled from 'styled-components';

const SearchInput = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 12px;
    color: var(--gray-light);
  }

  .form-control {
    padding-left: 30px;
  }
`;

export default {
  SearchInput,
};
