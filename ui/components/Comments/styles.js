import styled from 'styled-components';

export const StyledComments = styled.div`
  max-width: 750px;
  margin: 0 auto 20px;
`;

export const CommentsList = styled.ol`
  margin-top: 20px;
  padding: 20px 0 0;
  border-top: 1px solid var(--gray-lighter);
  list-style: none;
`;

export const Comment = styled.li`
  border: 1px solid var(--gray-lighter);
  padding: 20px;
  border-radius: 3px;

  header span {
    display: inline-block;
    margin-left: 5px;
    color: var(--gray-light);
  }

  > div {
    margin-top: 20px;

    p:last-child {
      margin-bottom: 0;
    }
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
