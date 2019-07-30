import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledComments = styled.div`
  max-width: 750px;
  margin: 0 auto 20px;
`;

export const CommentsList = styled.ol`
  margin-top: 40px;
  padding: 0;
  list-style: none;

  h3 {
    font-size: 18px;
    margin: 0 0 40px;
  }
`;

export const CommentsListHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  h3 {
    margin: 0;
  }

  select {
    margin-left: auto;
    display: inline-block;
    width: auto;
    min-width: 120px;
  }
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
