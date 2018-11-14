import curl from './curl';

export default {
  curl({ params, request }) {
    const { method } = request; // NOTE: method is one of: HEAD, OPTIONS, GET, POST, PUT, DELETE, PATCH
    const handler = curl[method];
    if (handler) return handler({ params, request });
    return `${method} is not supported.`;
  },
};
