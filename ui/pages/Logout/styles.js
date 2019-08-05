import styled from 'styled-components';
import { lighten } from 'polished';

export default styled.div`
  padding: 20px;
  background: var(--cb-blue);
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: 100px;
    height: auto;
  }

  h1 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: ${lighten(0.25, '#4285F4')};
  }

  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 10px 0 0;
  }

  ul li {
    float: left;
    font-size: 28px;
    line-height: 28px;

    a {
      color: #fff;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    h1 {
      font-size: 26px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;
