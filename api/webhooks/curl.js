const get = (request, params) => {
  console.log('GET', params);
};

const post = (request) => {
  console.log('POST', request.body);
};

export default {
  get,
  post,
};
