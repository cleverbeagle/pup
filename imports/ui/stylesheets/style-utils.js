import { css } from 'styled-components';

const sizes = {
  handheld: 0,
  handheldLarge: 480,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1200,
};

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  /* eslint-disable no-param-reassign */
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  /* eslint-enable no-param-reassign */
  return accumulator;
}, {});

export default media;
