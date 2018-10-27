const get = (request) => {
  console.log('GET', request.query);
};

const post = (request) => {
  console.log('POST', request.body);
};

export default {
  get,
  post,
};
